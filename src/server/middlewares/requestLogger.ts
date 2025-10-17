import pinoHttp from "pino-http";

import { logger as baseLogger } from "../logger.ts";

export const requestLogger = pinoHttp({
  customAttributeKeys: {
    err: "error",
    req: "request",
    res: "response",
    responseTime: "duration",
  },
  logger: baseLogger,
});
