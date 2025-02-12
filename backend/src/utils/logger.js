const winston = require("winston");
const { format, transports } = winston;
const path = require("path");

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/info.log"),
      level: "info",
    }),

    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),

    new transports.Console({
      format: consoleFormat,
    }),
  ],
});

module.exports = logger;
