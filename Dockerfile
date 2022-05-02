FROM node:16-alpine AS builder

ARG NPM_AUTH=$NPM_AUTH
ARG NPM_EMAIL=$NPM_EMAIL
WORKDIR /devcenter
COPY package.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "start" ]