FROM node:16-alpine AS builder

# Install deps
ARG NPM_AUTH=$NPM_AUTH
ARG NPM_EMAIL=$NPM_EMAIL
ARG HOST_URL=$HOST_URL
ARG STRAPI_URL=$STRAPI_URL
ARG DEVHUB_URL=$DEVHUB_URL
ARG APP_RELEASE=$APP_RELEASE
ARG REALM_API_URL=$REALM_API_URL
ARG REALM_SEARCH_URL=$REALM_SEARCH_URL
WORKDIR /devcenter
COPY package.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile

# Build
COPY . .
RUN yarn build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs /devcenter
USER nextjs

ENV APP_RELEASE $APP_RELEASE
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "start" ]