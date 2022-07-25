FROM node:16.16.0-slim

WORKDIR /devcenter

COPY package.json yarn.lock .eslintrc.json next-env.d.ts next.config.js tsconfig.json sentry.server.config.ts sentry.client.config.ts ./
COPY src ./src
COPY public ./public
COPY config ./config
COPY node_modules ./node_modules
COPY .next ./.next

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs /devcenter
USER nextjs

ENV APP_ENV $APP_ENV
ENV APP_RELEASE $APP_RELEASE
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "start" ]