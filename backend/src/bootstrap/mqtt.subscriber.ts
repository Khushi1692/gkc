import { getMqttClient } from "../services/mqtt.client";
import { printJobs } from "../services/print.jobs";

export function initMqttSubscriber(): void {
  const client = getMqttClient();

  client.subscribe("print/+/status", (err) => {
    if (err) {
      console.error("❌ Failed to subscribe to printer status");
      return;
    }
    console.log("📡 Subscribed to printer status topics");
  });

  client.on("message", (_, message) => {
    try {
      const data = JSON.parse(message.toString()) as {
        jobId: string;
        status: "printed" | "error";
        reason?: string;
      };

      const job = printJobs.get(data.jobId);
      if (!job) return;

      if (data.status === "printed") {
        job.resolve();
      } else {
        job.reject(new Error(data.reason ?? "Print failed"));
        printJobs.delete(data.jobId);
      }
    } catch {
      console.warn("⚠️ Invalid printer status payload");
    }
  });
}
