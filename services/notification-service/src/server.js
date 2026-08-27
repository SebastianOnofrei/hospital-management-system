import { notificationLogger } from "../../../packages/logger/src/index.js";
import app from "./app.js";
import { kafkaProducer } from "./infrastructure/kafka/kafka-client.js";

const PORT = process.env.PORT || 3005;

async function startServer() {
  try {
    await kafkaProducer.connect();
    notificationLogger.info("Kafka producer connected");

    app.listen(PORT, () => {
      notificationLogger.info(
        {
          port: PORT,
        },
        "Notification service started",
      );
    });
  } catch (error) {
    notificationLogger.error(
      { err: error },
      "Failed to start appointment-service",
    );

    process.exit(1);
  }
}

async function shutdown(signal) {
  notificationLogger.info({ signal }, "Shutdown initiated");
  try {
    await kafkaProducer.disconnect();
    notificationLogger.info("Kafka producer disconnected");
    process.exit(0);
  } catch (error) {
    notificationLogger.error({ err: error }, "Failed during shutdown");
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
