# MongoDB Developer Center

This project uses [Next.js](https://nextjs.org) with TypeScript as a basis for the Developer Center site. The main source code (pages, components, data fetching, etc.) is contained in the `src` directory.
## Setup

### Artifactory
We use Artifactory (MongoDB's internal package repository) as our primary source of dependencies. You will need to set the following ENV variables: NPM_AUTH and NPM_EMAIL. These are used in the `.npmrc` file at the top level of this project. For now, refer to [this DevHub wiki page](https://wiki.corp.mongodb.com/display/DEVREL/Setup+Artifactory+for+DevHub) to set these variables.

### Local Enviroment

The data for this project is fetched from a Strapi CMS. In order to get actual data, we have to configure the Strapi URL we want to use in development. To do this, create a file in the top level of this project called `.env.local` (this will be ignored by git).

Currently the only variable we need to set in this file is `STRAPI_URL`. See [this DevHub wiki page](https://wiki.corp.mongodb.com/display/DEVREL/DevHub+Front-End+Guide#DevHubFrontEndGuide-InstallationandSetup) and copy the value for `STRAPI_URL` shown there (or ask a teammate).

## Running Locally

Run `yarn` to install dependencies. Run `yarn develop` to start the server locally in development mode. It then should be accessible at http://localhost:3000.

## Formatting

We use [Prettier](https://prettier.io/) in order to keep consistent code styling. Run `yarn format` to format the code in the project with Prettier. Alternatively, if you use VS Code, download the Prettier extension and configure it as your default JS/TS formatter. You can then point it to use the rules set out in `.prettierrc` and format on save/type.
