import { getMqttClient } from "../services/mqtt.client";
import { Branch } from "../models/branch.models";

const HEARTBEAT_TIMEOUT_MS = 15_000; // 15 seconds

export function initHeartbeatListener(): void {
  const client = getMqttClient();

  // 1️⃣ Subscribe to all branch heartbeats
  client.subscribe("print/+/heartbeat", (err) => {
    if (err) {
      console.error("❌ Failed to subscribe to printer heartbeats", err);
      return;
    }
    console.log("❤️ Subscribed to printer heartbeats");
  });

  // 2️⃣ Handle incoming heartbeats
  client.on("message", async (topic) => {
    if (!topic.endsWith("/heartbeat")) return;

    /**
     * Topic format:
     * print/{branchCode}/heartbeat
     */
    const parts = topic.split("/");
    if (parts.length !== 3) return;

    const branchCode = parts[1]; // 🔑 stable identifier

    try {
      await Branch.findOneAndUpdate(
        { code: branchCode },
        {
          "printer.lastSeenAt": new Date(),
          "printer.isOnline": true,
        }
      );
    } catch (err) {
      console.error(
        `❌ Failed to update heartbeat for branch ${branchCode}`,
        err
      );
    }
  });

  // 3️⃣ Periodic offline detection
  setInterval(async () => {
    const cutoff = new Date(Date.now() - HEARTBEAT_TIMEOUT_MS);

    try {
      await Branch.updateMany(
        {
          "printer.enabled": true,
          "printer.lastSeenAt": { $lt: cutoff },
        },
        {
          "printer.isOnline": false,
        }
      );
    } catch (err) {
      console.error("❌ Failed to mark printers offline", err);
    }
  }, HEARTBEAT_TIMEOUT_MS);
}
