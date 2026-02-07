import { getMqttClient } from "../services/mqtt.client";
import { printJobs } from "../services/print.jobs";

export function initMqttSubscriber(): void {
  const client = getMqttClient();

  // 1️⃣ Subscribe to the GLOBAL status topic from the receipt
  client.subscribe("PrintSuccess", (err) => {
    if (err) console.error("❌ Failed to subscribe to PrintSuccess");
    else console.log("📡 Subscribed to global 'PrintSuccess' topic");
  });

  client.on("message", (topic, message) => {
    if (topic !== "PrintSuccess") return;

    const msgString = message.toString();

    const match = msgString.match(/\[(.*?)\]/);
    const senderId = match ? match[1] : null;

    const parts = msgString.split(";");
    if (parts.length < 4) return;

    const type = parts[0]; // "4" = Print Done
    const status = parts[2]; // "9800" = Success
    const jobId = parts[parts.length - 1]; // "order_12345"

    // Ensure it is a Print Done message
    if (type !== "4") return;

    const job = printJobs.get(jobId);
    if (!job) return;

    if (senderId && senderId !== job.printerId) {
      return; // Ignore this message, it's not for us
    }

    if (status === "9800") {
      console.log(`✅ Job ${jobId} printed successfully`);
      job.resolve();
    } else {
      console.error(`❌ Job ${jobId} failed with status: ${status}`);
      job.reject(new Error(`Printer Error Code: ${status}`));
      printJobs.delete(jobId);
    }
  });
}
