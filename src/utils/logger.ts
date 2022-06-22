import pino, { stdTimeFunctions } from 'pino';

/*
 * Example usage: ([mergedObject], [message], [interpolatedValues])
 * logger.info({b: "hello"}, "empire %s %s", "strikes", "back")
 * output: {"level":30,"time":2022-06-15T22:24:44.918Z,"msg":"empire strikes back", "b": "hello"}
 *
 * For full documentation, please see https://getpino.io/#/docs/api
 *
 * Environemntal variable PINO_LOG_LEVEL can be set to filter different logs.
 * By default, info is set so levels below info (e.g., debug and trace) are suppressed and not shown
 *
 * Note that there is a issue of using pino in middleware, so the below configuration is used.
 * For more, please see https://github.com/vercel/next.js/discussions/33898
 */

// configuration for pino, a logger library
const logger = pino({
    // Pino logger does not output JSON within NextJS middleware function #33898
    // https://github.com/vercel/next.js/discussions/33898
    browser: {
        write(o) {
            console.log(JSON.stringify(o));
        },
    },
    level: process.env.PINO_LOG_LEVEL || 'info',
    // doc notes that formatting time in-process impacts logging performance
    timestamp: stdTimeFunctions.isoTime, // built-in ISO 8601-formatted time in UTC
});

const URL_NOT_TO_LOG = new Set<string | undefined>(['/api/health/']);

function should_not_log<T>(data: T, to_exclude: Set<T>): boolean {
    if (data === undefined) {
        return true;
    }

    return to_exclude.has(data);
}

export function logRequestData(
    url: string | undefined,
    method: string | undefined,
    statusCode: number,
    level?: pino.Level
): void {
    const logData = {
        url: url,
        method: method,
        statusCode: statusCode,
    };

    if (should_not_log(logData.url, URL_NOT_TO_LOG)) {
        return;
    }

    if (level === undefined) {
        if (statusCode >= 500 && statusCode <= 599) {
            level = 'error';
        } else if (statusCode >= 400 && statusCode <= 499) {
            level = 'warn';
        } else {
            level = 'info';
        }
    }

    try {
        logger[level](logData);
    } catch (err) {
        logger.error('Unknown logger method used.');
    }
}

export default logger;
