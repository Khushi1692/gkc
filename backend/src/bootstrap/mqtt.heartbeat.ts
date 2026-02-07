import { getMqttClient } from "../services/mqtt.client";
import { Branch } from "../models/branch.models";

const HEARTBEAT_TIMEOUT_MS = 40_000; // 40s (receipt says 30s interval, give 10s buffer)

export function initHeartbeatListener(): void {
  const client = getMqttClient();

  // 1️⃣ Subscribe to the GLOBAL heartbeat topic from the receipt
  client.subscribe("heartbeat", (err) => {
    if (err) console.error("❌ Failed to subscribe to heartbeat");
    else console.log("❤️ Subscribed to global 'heartbeat' topic");
  });

  // 2️⃣ Handle incoming heartbeats
  client.on("message", async (topic, message) => {
    if (topic !== "heartbeat") return;

    const msgString = message.toString();
    // Format from Manual: 2;[PrnID];Status;...
    // Example: "2;[Prn3F1C...];9800;-58;25;..."

    // Extract the content inside [ ]
    const match = msgString.match(/\[(.*?)\]/);

    if (!match || !match[1]) return;

    const printerId = match[1]; // e.g. "Prn3F1C1A3916353310000013091A1FC0BF"

    try {
      // 🟢 Update the branch that matches this Printer ID
      // We search by 'printer.mqtt.cmdTopic' because that's where we stored the ID
      await Branch.findOneAndUpdate(
        { "printer.mqtt.cmdTopic": printerId },
        {
          "printer.lastSeenAt": new Date(),
          "printer.isOnline": true,
        },
      );
    } catch (err) {
      console.error(
        `❌ Failed to update heartbeat for printer ${printerId}`,
        err,
      );
    }
  });

  // 3️⃣ Periodic offline detection (Remains the same)
  setInterval(async () => {
    const cutoff = new Date(Date.now() - HEARTBEAT_TIMEOUT_MS);
    await Branch.updateMany(
      { "printer.enabled": true, "printer.lastSeenAt": { $lt: cutoff } },
      { "printer.isOnline": false },
    );
  }, HEARTBEAT_TIMEOUT_MS);
}
