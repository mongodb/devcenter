import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN: string | undefined = process.env.SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Sentry.Replay()],
    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.APP_ENV ? process.env.APP_ENV : 'dev',
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0.1,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});
