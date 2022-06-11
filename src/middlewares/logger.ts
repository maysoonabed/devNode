import { createLogger, transports, format } from "winston";
import { createWriteStream } from "fs";

export const logger = createLogger({
    transports: [
        new transports.Stream({
            stream: createWriteStream("ticketsLogger.txt"),
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, service }) => {
            return `[${timestamp}] ${service} ${level}: ${message}`;
        })
    ),
    defaultMeta: {
        service: "Tickets ",
    },
});