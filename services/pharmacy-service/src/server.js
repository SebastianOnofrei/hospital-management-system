import { pharmacyLogger } from "../../../packages/logger/src/index.js";
import app from "./app.js";
import { kafkaProducer } from "./infrastructure/kafka/kafka-client.js";

const PORT = process.env.PORT || 3007;

async function startServer() {
  try {
    await kafkaProducer.connect();
    pharmacyLogger.info("Kafka producer connected");

    app.listen(PORT, () => {
      pharmacyLogger.info(
        {
          port: PORT,
        },
        "Pharmacy service started",
      );
    });
  } catch (error) {
    pharmacyLogger.error({ err: error }, "Failed to start appointment-service");

    process.exit(1);
  }
}

async function shutdown(signal) {
  pharmacyLogger.info({ signal }, "Shutdown initiated");
  try {
    await kafkaProducer.disconnect();
    pharmacyLogger.info("Kafka producer disconnected");
    process.exit(0);
  } catch (error) {
    pharmacyLogger.error({ err: error }, "Failed during shutdown");
    process.exit(1);
  }
}

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
process.on("SIGINT", () => {
  shutdown("SIGINT");
});

startServer();
