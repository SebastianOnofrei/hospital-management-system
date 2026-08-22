import pinoHttp from "pino-http";

export function createHttpLogger(logger) {
  return pinoHttp({ logger });
}
