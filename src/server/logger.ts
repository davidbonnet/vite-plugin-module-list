import pino from "pino";

const { LOG_LEVEL = "info" } = process.env;

export const logger = pino({
  level: LOG_LEVEL.toLowerCase(),
  redact: {
    censor: "*****",
    paths: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers['if-match']",
      "request.headers['if-modified-since']",
      "request.headers['if-none-match']",
      "request.headers['if-unmodified-since']",
      "request.headers['idempotency-key']",
      "response.headers.etag",
    ],
  },
  transport: {
    targets:
      process.env.NODE_ENV === "production"
        ? [{ target: "./logger-transports/stdout.js" }]
        : [
            {
              options: {
                colorize: true,
              },
              target: "pino-pretty",
            },
          ],
  },
});
