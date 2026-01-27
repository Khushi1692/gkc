import mqtt, { MqttClient } from "mqtt";
import { config } from "../config/config";

let client: MqttClient | null = null;

export function getMqttClient(): MqttClient {
  if (!client) {
    client = mqtt.connect(config.mqtt.url, {
      username: config.mqtt.username,
      password: config.mqtt.password,
      clientId: `backend-${process.pid}`,
      clean: false,
      keepalive: 30,
      reconnectPeriod: 3000,
    });

    client.on("connect", () => {
      console.log("✅ MQTT connected");
    });

    client.on("error", (err) => {
      console.error("❌ MQTT error:", err.message);
    });
  }

  return client;
}
