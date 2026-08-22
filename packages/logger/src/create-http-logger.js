import pinoHttp from "pino-http";
import crypto from "node:crypto";

export function createHttpLogger(logger) {
  return pinoHttp({
    logger,

    genReqId: (req, res) => {
      const incomingRequestId = req.headers["x-request-id"];

      if (incomingRequestId) {
        res.setHeader("x-request-id", incomingRequestId);

        return incomingRequestId;
      }

      const requestId = crypto.randomUUID();

      res.setHeader("x-request-id", requestId);

      return requestId;
    },
  });
}
