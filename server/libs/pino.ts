import pino, { Logger } from "pino";

let logger: Logger;
const { logLevel } = useRuntimeConfig();
 
if (process.env.NODE_ENV === "production") {
  logger = pino({
    level: logLevel,
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
