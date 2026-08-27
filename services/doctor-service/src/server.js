import { doctorLogger } from "../../../packages/logger/src/index.js";
import app from "./app.js";
import { kafkaProducer } from "./infrastructure/kafka/kafka-client.js";

const PORT = process.env.PORT || 3004;

async function startServer() {
  try {
    await kafkaProducer.connect();
    doctorLogger.info("Kafka producer connected");

    app.listen(PORT, () => {
      doctorLogger.info(
        {
          port: PORT,
        },
        "Doctor service started",
      );
    });
  } catch (error) {
    doctorLogger.error({ err: error }, "Failed to start appointment-service");

    process.exit(1);
  }
}

async function shutdown(signal) {
  doctorLogger.info({ signal }, "Shutdown initiated");
  try {
    await kafkaProducer.disconnect();
    doctorLogger.info("Kafka producer disconnected");
    process.exit(0);
  } catch (error) {
    doctorLogger.error({ err: error }, "Failed during shutdown");
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
