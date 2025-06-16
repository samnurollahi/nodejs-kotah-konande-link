const winston = require("winston")
const rootApp = require("app-root-path")

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "info",
            maxsize: 5_000_000,
            maxFiles: 5,
            handleExceptions: true,
            filename: `${rootApp}/logs/app.log`,
            format: winston.format.json(),
        }),
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
    exitOnError: false
})

logger.stream = {
    write: function(msg) {
        logger.info(msg)
    }
}

module.exports = logger