import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN: string | undefined = process.env.SENTRY_DSN;

console.log('server config');
console.log('process.env.APP_ENV', process.env.APP_ENV);

Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.APP_ENV ? process.env.APP_ENV : 'dev',
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});
