import * as winston from "winston";

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const base = { timestamp, level, message };
    if (stack) Object.assign(base, { stack });
    if (Object.keys(meta).length) Object.assign(base, { meta });
    return JSON.stringify(base);
  }),
);

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
          const msg = stack || (typeof message === "object" ? JSON.stringify(message, null, 2) : message);
          const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
          return `${timestamp} [${level}]: ${msg}${metaStr}`;
        }),
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error", format: fileFormat }),
    new winston.transports.File({ filename: "combined.log", format: fileFormat }),
  ],
});