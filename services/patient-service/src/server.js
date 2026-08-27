import { patientLogger } from "../../../packages/logger/src/index.js";
import app from "./app.js";
import { kafkaProducer } from "./infrastructure/kafka/kafka-client.js";

const PORT = process.env.PORT || 3006;

async function startServer() {
  try {
    await kafkaProducer.connect();
    patientLogger.info("Kafka producer connected");

    app.listen(PORT, () => {
      patientLogger.info(
        {
          port: PORT,
        },
        "Patient service started",
      );
    });
  } catch (error) {
    patientLogger.error({ err: error }, "Failed to start appointment-service");

    process.exit(1);
  }
}

async function shutdown(signal) {
  patientLogger.info({ signal }, "Shutdown initiated");
  try {
    await kafkaProducer.disconnect();
    patientLogger.info("Kafka producer disconnected");
    process.exit(0);
  } catch (error) {
    patientLogger.error({ err: error }, "Failed during shutdown");
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
