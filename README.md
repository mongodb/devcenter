[![Build Status](https://drone.corp.mongodb.com/api/badges/mongodb/devcenter/status.svg?ref=refs/heads/main)](https://drone.corp.mongodb.com/mongodb/devcenter)

# MongoDB Developer Center

This project uses [Next.js](https://nextjs.org) with TypeScript as a basis for the Developer Center site. The main source code (pages, components, data fetching, etc.) is contained in the `src` directory.

## Setup

### Artifactory

We use Artifactory (MongoDB's internal package repository) as our primary source of dependencies. You will need to set the following ENV variables: NPM_AUTH and NPM_EMAIL. These are used in the `.npmrc` file at the top level of this project. For now, refer to [this DevHub wiki page](https://wiki.corp.mongodb.com/display/DEVREL/Setup+Artifactory+for+DevHub) to set these variables.

### Local Enviroment

The data for this project is fetched from a Strapi CMS. In order to get actual data, we have to configure the Strapi URL we want to use in development. To do this, create a file in the top level of this project called `.env.local` (this will be ignored by git).

Currently the only variable we need to set in this file is `STRAPI_URL`. See [this DevHub wiki page](https://wiki.corp.mongodb.com/display/DEVREL/DevHub+Front-End+Guide#DevHubFrontEndGuide-InstallationandSetup) and copy the value for `STRAPI_URL` shown there (or ask a teammate).

## Running Locally

Run `yarn` to install dependencies. Run `yarn dev` to start the server locally in development mode. It then should be accessible at http://localhost:3000/developer.

### Running Locally with Docker

Ensure you have the necessary environment variables set in your terminal session (NPM_AUTH and NPM_EMAIL).

To build the Docker image, run the following:

`docker build -t nextjs-docker --no-cache --build-arg NPM_AUTH --build-arg NPM_EMAIL --build-arg STRAPI_URL . --build-arg HOST_URL .`

To create the container, run:

`docker run -p 3000:3000 --env-file ./.env.local nextjs-docker`

## Testing

Run `yarn test` to run all unit tests and integration tests.

Run `yarn test:e2e` to open Cypress WEB-UI and execute e2e tests in cypress folder from web-ui. Make sure application is up and running on http://localhost:3000/developer before running cypress tests.

## Formatting

We use [Prettier](https://prettier.io/) in order to keep consistent code styling. Run `yarn format:write` to format the code in the project with Prettier. Alternatively, if you use VS Code, download the Prettier extension and configure it as your default JS/TS formatter. You can then point it to use the rules set out in `.prettierrc` and format on save/type.

## Bundle Analyzer

This project uses `@next/bundle-analyzer` to analyze our webpack bundles. If you want to analyze while building, build with the `yarn build:analyze` command. This will allow the build to generate html files that show a bundle analysis. See [the `webpack-bundle-analyzer` repo](https://github.com/webpack-contrib/webpack-bundle-analyzer) for more info on the underlying tool.