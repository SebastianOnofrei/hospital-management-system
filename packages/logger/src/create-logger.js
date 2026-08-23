import pino from "pino";

export function createLogger(serviceName) {
  return pino({
    level: process.env.LOG_LEVEL ?? "info",
    base: {
      service: serviceName,
      environment: process.env.NODE_ENV ?? "development",
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  });
}
