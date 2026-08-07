# 🖨️ Print Service Deployment Guide — Gopi Ka Chatka

This guide explains how to deploy the print service on your **Contabo VPS** so that every successful order automatically prints a receipt on the **physical thermal printer** at the branch.

---

## 🗺️ How The Whole System Works — Step by Step

Here is the complete journey from a customer placing an order to the receipt coming out of the printer:

```
Customer pays on website
        │
        ▼
  Stripe confirms payment
        │
        ▼
  Stripe sends Webhook ──► Your VPS backend (POST /api/payments/webhook)
        │                   stripeWebhook.ts receives it
        ▼
  Order marked "paid" in MongoDB
        │
        ▼
  PrinterService.printOrderReceipt() is called
        │
        ├─► Generates PDF receipt (escpos.ts → pdfkit)
        │
        ├─► Converts PDF → Base64 string
        │
        └─► Publishes MQTT message to printer's cmdTopic
                │
                ▼
         MQTT Broker (Mosquitto on your VPS)
                │
                ▼
         Thermal Printer (connected to WiFi, subscribed to cmdTopic)
                │
                ▼
         🧾 Receipt prints physically!
```

---

## 📦 Components Involved

| Component | What it does | Where it runs |
|-----------|-------------|---------------|
| **Express Backend** | Receives Stripe webhook, triggers print | VPS (Node.js) |
| **Stripe Webhook** | Notifies backend of successful payment | Stripe servers → VPS |
| **PrinterService** | Generates PDF, publishes to MQTT | VPS |
| **MQTT Broker (Mosquitto)** | Message relay between server and printer | VPS |
| **Thermal Printer** | Physically prints the receipt | Branch (WiFi connected) |
| **MongoDB** | Stores order + print status + logs | VPS |

---

## 🚀 Deployment Steps

### Step 1 — Set `NODE_ENV=production` in your `.env`

On your VPS, open the backend `.env` file and change:

```env
NODE_ENV=production
```

> [!IMPORTANT]
> This is the **critical switch**. In `development` mode, the receipt is only saved as a PDF file on disk. In `production` mode, it sends the MQTT print command to the real printer.

---

### Step 2 — Install and Configure Mosquitto (MQTT Broker) on VPS

The printer communicates via MQTT. You need an MQTT broker running on your VPS.

**Install Mosquitto:**
```bash
sudo apt update
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```

**Create config file `/etc/mosquitto/conf.d/gkc.conf`:**
```
listener 1883
allow_anonymous false
password_file /etc/mosquitto/passwd
```

**Create a username/password:**
```bash
sudo mosquitto_passwd -c /etc/mosquitto/passwd yourUsername
# Enter your password when prompted
```

**Restart Mosquitto:**
```bash
sudo systemctl restart mosquitto
```

**Update your VPS `.env` to match:**
```env
MQTT_URL=mqtt://localhost:1883
MQTT_USERNAME=yourUsername
MQTT_PASSWORD=yourPassword
```

> [!NOTE]
> The MQTT broker runs on **port 1883** by default. Make sure this port is **open in your VPS firewall** if the printer connects from outside the server (it usually does, since the printer is at the restaurant).

**Open firewall port 1883:**
```bash
sudo ufw allow 1883
sudo ufw reload
```

---

### Step 3 — Configure Your Thermal Printer in MongoDB

Your printer connects to MQTT and listens on a specific **topic**. You need to set this up in the Branch document in MongoDB.

**Connect to MongoDB on your VPS:**
```bash
mongosh mongodb://localhost:27017/gopikachatka
```

**Update the branch document:**
```js
db.branches.updateOne(
  { code: "your-branch-code" },
  {
    $set: {
      "printer.enabled": true,
      "printer.mqtt.cmdTopic": "Prn3F1C_your_printer_serial/cmd",
      "printer.mqtt.statusTopic": "Prn3F1C_your_printer_serial/status",
      "printer.mqtt.heartbeatTopic": "Prn3F1C_your_printer_serial/heartbeat"
    }
  }
)
```

> [!IMPORTANT]
> The `cmdTopic`, `statusTopic`, and `heartbeatTopic` values come from your **thermal printer's configuration app**. These are unique to each printer device. Check your printer's WiFi/MQTT setup app to find the correct topic names.

---

### Step 4 — Configure Stripe Webhooks to Point to Your VPS

Stripe needs to know where to send payment success events.

1. Go to **[Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)**
2. Click **"Add endpoint"**
3. Set the URL to:
   ```
   https://yourdomain.com/api/payments/webhook
   ```
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_...`)
6. Paste it in your VPS `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_real_secret_here
   ```

> [!WARNING]
> Never use the test webhook secret in production. Stripe gives you separate secrets for test and live mode.

---

### Step 5 — Update Full `.env` on VPS

Here is what your production `.env` should look like:

```env
# Server
PORT=3000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/gopikachatka

# JWT
JWT_SECRET=a_very_long_random_secret_here
JWT_EXPIRES_IN=24h
SALT_ROUNDS=10

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.gmail@gmail.com
EMAIL_PASS=your_app_password_here

# Frontend
FRONTEND_URL=https://yourdomain.com

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Stripe
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Admin
ADMIN_EMAIL=your.admin@gmail.com

# MQTT (Mosquitto on this VPS)
MQTT_URL=mqtt://localhost:1883
MQTT_USERNAME=yourUsername
MQTT_PASSWORD=yourPassword
```

---

### Step 6 — Build and Start the Backend

**On your VPS, inside the backend directory:**
```bash
cd /path/to/gkc/backend

# Install dependencies
npm install

# Compile TypeScript
npx tsc

# Start with PM2 (keeps it running after reboot)
npm install -g pm2
pm2 start dist/server.js --name gkc-backend
pm2 save
pm2 startup
```

> [!TIP]
> Use `pm2 logs gkc-backend` to see live logs including print job events.

---

## 📋 How Logging Works

All print events are logged in **two places**:

### 1. Console / PM2 Logs (Real-time)
When an order is paid, you'll see these log lines:
```
✅ Order ORD-20260507-001 paid successfully
🖨️ Receipt printed for order ORD-20260507-001
📧 Order confirmation emails sent successfully
```

**View live logs:**
```bash
pm2 logs gkc-backend
```

**View last 200 lines:**
```bash
pm2 logs gkc-backend --lines 200
```

### 2. MongoDB (Persistent Order Logs)
Every order has these fields that track the print status:

| Field | What it stores |
|-------|---------------|
| `paymentStatus` | `"pending"` → `"paid"` or `"failed"` |
| `printStatus` | `"pending"` → `"printed"` or `"failed"` |
| `printedAt` | Exact timestamp when receipt was printed |
| `printAttempts` | How many times printing was attempted |

**Query failed prints in MongoDB:**
```bash
mongosh mongodb://localhost:27017/gopikachatka --eval \
  'db.orders.find({ printStatus: "failed" }).pretty()'
```

**Query successful prints today:**
```bash
mongosh mongodb://localhost:27017/gopikachatka --eval \
  'db.orders.find({ printStatus: "printed", printedAt: { $gte: new Date(new Date().setHours(0,0,0,0)) } }).pretty()'
```

---

## 🔄 Complete Order Flow (Detailed)

```
1. Customer adds items to cart & goes to checkout
   └─► Frontend calls POST /api/payments/create-intent
       └─► Creates Stripe PaymentIntent
       └─► Creates Order in MongoDB (status: "pending")

2. Customer enters card details & pays
   └─► Stripe processes payment on their servers

3. Payment succeeds
   └─► Stripe calls your webhook: POST /api/payments/webhook
       └─► stripeWebhook.ts receives the "payment_intent.succeeded" event
       └─► Verifies signature using STRIPE_WEBHOOK_SECRET
       └─► Updates Order.paymentStatus = "paid" in MongoDB

4. PrinterService.printOrderReceipt(orderId) is called
   └─► Fetches full order from MongoDB
           (with branch, items, user populated)
   └─► Checks if order was already printed (printedAt field)
   └─► Checks if branch printer is enabled (printer.enabled = true)
   └─► generateReceiptBase64(order) is called
           (escpos.ts → builds PDF with pdfkit → returns base64 string)
   └─► Publishes MQTT message to branch's cmdTopic:
       {
         ticket_id: "ORD-20260507-001",
         data_type: "pdf",
         data_base64: "...(base64 encoded PDF)...",
         paper_type: 1,
         paper_width_mm: 72,
         paper_height_mm: 0,
         cut_paper: 1
       }
   └─► Updates Order:
       - printStatus = "printed"
       - printedAt = now
       - printAttempts += 1

5. MQTT Broker (Mosquitto on VPS) receives the message
   └─► Forwards it to the printer (subscribed to that cmdTopic)

6. Thermal printer receives the message
   └─► Decodes the base64 PDF
   └─► Prints the receipt
   └─► Auto-cuts the paper

7. Emails are sent simultaneously
   └─► Confirmation email to the customer
   └─► Copy to admin (ADMIN_EMAIL)
   └─► Copy to branch email (if set)
```

---

## 🧪 Testing on the Server

After deployment, test the print system:

**Test MQTT broker is working:**
```bash
# Subscribe (in one terminal)
mosquitto_sub -h localhost -u yourUsername -P yourPassword -t "test/topic"

# Publish (in another terminal)
mosquitto_pub -h localhost -u yourUsername -P yourPassword -t "test/topic" -m "hello"
```

**Test the webhook manually (using Stripe CLI on VPS):**
```bash
# Install Stripe CLI
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-track stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe

# Forward events to your local server (useful for testing)
stripe listen --forward-to localhost:3000/api/payments/webhook
```

---

## ❗ Common Issues & Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| Receipt not printing | `NODE_ENV` is still `development` | Set `NODE_ENV=production` in `.env` |
| Receipt not printing | `printer.enabled` is `false` in DB | Update branch document in MongoDB |
| MQTT connection refused | Mosquitto not running | `sudo systemctl start mosquitto` |
| MQTT auth failed | Wrong credentials | Check `MQTT_USERNAME` / `MQTT_PASSWORD` in `.env` |
| Webhook signature error | Wrong `STRIPE_WEBHOOK_SECRET` | Copy the correct secret from Stripe Dashboard |
| Printer offline | Printer not connected to WiFi | Check printer WiFi settings |
| Printer offline | Wrong MQTT topics in DB | Verify `cmdTopic` matches printer config |
| Order printed twice | Race condition | The `printedAt` check prevents duplicate prints |

---

## 🔐 Security Checklist Before Going Live

- [ ] `NODE_ENV=production` set in `.env`
- [ ] Stripe live keys used (not test keys)
- [ ] MQTT broker has username/password authentication
- [ ] Firewall: Port 1883 open only to printer IP if possible
- [ ] `JWT_SECRET` is a long random string (not `your_jwt_secret`)
- [ ] Gmail App Password used (not your real Gmail password)
- [ ] PM2 configured to auto-restart on crash and reboot
