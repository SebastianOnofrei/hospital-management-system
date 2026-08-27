import { billingLogger } from "../../../packages/logger/src/index.js";
import app from "./app.js";
import { kafkaProducer } from "./infrastructure/kafka/kafka-client.js";

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    await kafkaProducer.connect();
    billingLogger.info("Kafka producer connected");

    app.listen(PORT, () => {
      billingLogger.info(
        {
          port: PORT,
        },
        "Billing service started",
      );
    });
  } catch (error) {
    billingLogger.error({ err: error }, "Failed to start appointment-service");

    process.exit(1);
  }
}

async function shutdown(signal) {
  billingLogger.info({ signal }, "Shutdown initiated");
  try {
    await kafkaProducer.disconnect();
    billingLogger.info("Kafka producer disconnected");
    process.exit(0);
  } catch (error) {
    billingLogger.error({ err: error }, "Failed during shutdown");
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
