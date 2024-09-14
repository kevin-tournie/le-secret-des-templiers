import pino, { Logger } from "pino";

var logger: Logger;

if (process.env.NODE_ENV === "production") {
  logger = pino({
    level: process.env.LOG_LEVEL,
  });
} else {
  logger = pino({
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  });
}

export default logger;
