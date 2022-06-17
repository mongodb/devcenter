import pino, { stdTimeFunctions } from 'pino';
import type { NextApiRequest, NextApiResponse } from 'next';

type ExtraLogData = {
    url: string | undefined;
    method: string | undefined;
    statusCode: number;
};

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

export function logDataFromNextAPIReqAndRes(
    req: NextApiRequest,
    res: NextApiResponse
): ExtraLogData {
    return {
        url: req.url,
        method: req.method,
        statusCode: res.statusCode,
    };
}

export default logger;

/*
 * Example usage: ([mergedObject], [message], [interpolatedValues])
 * logger.info({b: "hello"}, "empire %s %s", "strikes", "back")
 * output: {"level":30,"time":2022-06-15T22:24:44.918Z,"msg":"empire strikes back", "b": "hello"}
 *
 * logger.error("terrible world")
 * output: {"level":50,"time":2022-06-15T22:24:44.918Z,"msg":"terrible world"}
 *
 * For full documentation, please see https://getpino.io/#/docs/api
 *
 * Note that different methods (e.g., fatal, error, warn, info, debug, trace) are available and can result in different levels
 * fatal=60, error=50, warn=40, info=30, debug=20, trace=10
 *
 * In the configuration above, we can set environemntal variable PINO_LOG_LEVEL to filter different logs.
 * By default, info is set so levels below info (e.g., debug and trace) are suppressed and not shown
 *
 * levels can be further customized if needed. For more, see https://getpino.io/#/docs/api?id=levels
 *
 * Also note that there is a issue of using pino in middleware, so the above configuration is used.
 * For more, please see https://github.com/vercel/next.js/discussions/33898
 */
