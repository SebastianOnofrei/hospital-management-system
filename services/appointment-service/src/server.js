import { appointmentLogger } from "../../../packages/logger/src/index.js";
import app from "./app.js";
import { kafkaProducer } from "./infrastructure/kafka/kafka-client.js";

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await kafkaProducer.connect();
    appointmentLogger.info("Kafka producer connected");

    app.listen(PORT, () => {
      appointmentLogger.info(
        {
          port: PORT,
        },
        "Appointment service started",
      );
    });
  } catch (error) {
    appointmentLogger.error(
      { err: error },
      "Failed to start appointment-service",
    );

    process.exit(1);
  }
}

async function shutdown(signal) {
  appointmentLogger.info({ signal }, "Shutdown initiated");
  try {
    await kafkaProducer.disconnect();
    appointmentLogger.info("Kafka producer disconnected");
    process.exit(0);
  } catch (error) {
    appointmentLogger.error({ err: error }, "Failed during shutdown");
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
