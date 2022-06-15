import pino, { stdTimeFunctions } from 'pino';

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

export default logger;

// below is example usage of the logger

// tldr;
// logger.info("hello world")
// output: {"level":30,"time":2022-06-15T22:24:44.918Z,"msg":"hello world"}

// // each logger instance has different methods which correspond to different levels
// logger.fatal('fatal'); // level: 60
// logger.error('error'); // level: 50
// logger.warn('warn'); // level: 40
// logger.info('info'); // level: 30; default level and show this and above
// logger.debug('debug'); // suppressed by default
// logger.trace('trace'); // suppressed by default

// process.env.PINO_LOG_LEVEL can be set as the minimum level to log
// by default, info is set, so all logs below info are suppressed

// each logging method has a signature
// ([mergingObject], [message], [...interpolationvalues])

// // message
// logger.info('Upload successful!');

// // output
// {
// 	"level":30,"time":2022-06-15T22:24:44.918Z,
// 	"msg":"Upload successful!"
// }

// object, msg, interpolated values
// logger.info(
//     { name: 'bucky.mp4', mime_type: 'video/mp4' },
//     '%s: file upload succeeded.',
//     'bucky.mp4'
//   );

//   // output
//   {
//       "level":30,"time":2022-06-15T22:24:44.918Z,
//       "name":"bucky.mp4","mime_type":"video/mp4",
//       "msg":"bucky.mp4: file upload succeeded."
//   }
