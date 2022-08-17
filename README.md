[![Build Status](https://drone.corp.mongodb.com/api/badges/mongodb/devcenter/status.svg?ref=refs/heads/main)](https://drone.corp.mongodb.com/mongodb/devcenter)

# MongoDB Developer Center

This project uses [Next.js](https://nextjs.org) with TypeScript as a basis for the Developer Center site. The main source code (pages, components, data fetching, etc.) is contained in the `src` directory.

## Setup

### Artifactory

We use Artifactory (MongoDB's internal package repository) as our primary source of dependencies. You will need to set the following ENV variables: NPM_AUTH and NPM_EMAIL. These are used in the `.npmrc` file at the top level of this project. For now, refer to [this DevHub wiki page](https://wiki.corp.mongodb.com/display/DEVREL/Setup+Artifactory+for+DevHub) to set these variables.

### Local Enviroment

The data for this project is fetched from a Strapi CMS. In order to get actual data, we have to configure the Strapi URL we want to use in development. To do this, create a file in the top level of this project called `.env.local` (this will be ignored by git).

`STRAPI_URL`. See [this DevHub wiki page](https://wiki.corp.mongodb.com/display/DEVREL/DevHub+Front-End+Guide#DevHubFrontEndGuide-InstallationandSetup) and copy the value for `STRAPI_URL` shown there (or ask a teammate).
`REALM_SEARCH_URL` and `REALM_API_URL` are needed for feedback and search functionality. Ask a teammate for these values.

## Running Locally

Run `yarn` to install dependencies. Run `yarn dev` to start the server locally in development mode. It then should be accessible at http://localhost:3000/developer.

### Running Locally with Docker

Ensure you have the necessary environment variables set in your terminal session (NPM_AUTH and NPM_EMAIL).

To build the Docker image, run the following:

`docker build -t nextjs-docker --no-cache --build-arg NPM_AUTH --build-arg NPM_EMAIL --build-arg STRAPI_URL --build-arg HOST_URL --build-arg REALM_API_URL --build-arg REALM_SEARCH_URL .`

To create the container, run:

`docker run -p 3000:3000 --env-file ./.env.local nextjs-docker`

## Branch Naming Conventions

Try to name your branch for the corresponding Jira ticket you are working on. For example, if you are working on Jira ticket DEVHUB-1001, your branch name should be `DEVHUB-1001`. If you have to name it something different, **PLEASE DO NOT INCLUDE "/" IN THE BRANCH NAME**. I know this is a common practice, but it will break the Drone preview environment because Drone doesn't decode the `branch` URL paramter when using its API to trigger events.

## Testing


### Unit tests

We use Jest to unit test our components. In the `src/components` directory, each component should have its own directory containing a file ending in `.test.tsx` that contains all test cases for that component.

Run `yarn test` to run unit tests.

### End-to-end tests

We use cypress for our E2E tests. Each file in `cypress/e2e` represents a test suite.

Run `yarn test:e2e` to run Playwright tests. Make sure you either have a local server running, or you have already run `yarn build` with the code you want to test. Playwright will check if anything is running on port 3000, and if not will attempt to run `next start`. 

Playwright has a useful code-generator that can help to write tests by performing actions on a page and generating Playwright scripts from them. To run it, do `npx playwright codegen <url>`. For example, if you want to write a test for the homepage, run `npx playwright codegen mongodb.com/developer`.

## Development and Deployment Workflow

Create a new branch from `main` that will contain the changes for the feature or bug fix. When ready to merge, create a pull request (PR) on GitHub, with the name of the ticket in the title (e.g. [DEVHUB-1234] - [Title]). The title can be a short description of what is about to be merged. Once the PR is opened, tests will be run via Github Actions, including Playwright tests, formatting checks and Lighthouse tests.

You can also create a draft PR in GitHub. A draft PR will run all of our tests against your PR, which can't be done without opening a PR, and lets other team members know that the PR isn't ready for review yet. When you are ready, you can mark the draft PR as ready for review and add reviewers.

When your PR is approved, you can merge it using GitHub's UI. You can choose either the "Merge pull request" button to merge the entire branch into the main branch, or use the "Squash and merge" option so that all changes are put into a single commit before merging. Don't use the "Rebase and merge" option since our team prefers merge over rebase.

### Staging Release

DevCenter is deployed on the Kanopy platform, and when a PR is merged into `main`, the changes will be released through our [drone](https://drone.corp.mongodb.com/mongodb/devcenter/) pipeline. Once the build is completed, the changes are promoted into staging automatically (https://mongodbcom-cdn.staging.corp.mongodb.com/developer/). At times, your browser cache will need to be cleared to see the changes immediately.

### Production Release

Once the changes are tested and ready to go to production, a new PR will need to be created that will merge the `main` branch into the `production` branch. Due to the fact that the application is static (using SSG on Next.js), the content is created at build time. As such, a separate build needs to be created for production. Merge the `main` -> `production PR by selecting "Merge pull request" in the Github dropdown. By merging the PR from `main` into `production`, a new [drone](https://drone.corp.mongodb.com/mongodb/devcenter/) build will be started. In order to complete the production deployment, that build will need to be promoted either from the Drone UI or CLI. To do this via the UI, navigate to the repository in Drone and select the latest production build. On the build page, click on the ellipsis at the top right and click "Promote" from the menu. The target name is "production." Alternatively, the build can be promoted with CLI:

```sh
drone build promote mongodb/devcenter <DRONE_BUILD_VERSION> production
```

### Production Rollback

When a build needs to be rolled back, we need to do the following:
1. Remove the rebuild cron by visiting https://drone.corp.mongodb.com/mongodb/devcenter/settings/cron and clicking the deletion icon. Alternatively, you can run `drone cron rm mongodb/devcenter rebuild-devcenter-prod-cron` from the command line.
2. Find the release that you want to rollback to. You can do this by going to Github and checking the PRs that were merged to `production`. Within a release PR, you can find the last Drone **build** that was run by clicking "View Details" on the PR and then checking which build "continuous-integration/drone Build is passing" is referencing. Once you find the build or build number, you can go to that build with the drone UI (e.g. https://drone.corp.mongodb.com/mongodb/devcenter/4438, where 4438 is the build number) and click promote -> rollback (branch: production). Alternatively, you can run `drone build promote mongodb/devcenter <rollback build number> production` which just rolls back to the specified build number.

#### Hotfixes

Hotfixes can be pushed either directly to the `production` branch or to `main` for future release (main -> production merges). If there is a large feature in staging (`main`) that should not be pushed, pushing a hotfix directly to the `production` branch is allowed.

If there is a feature that was rolled back and needs to be reverted since a hotfix is not possible, any reverted changes will also have to take a affect in `production`. This means any changes made to `main` (including reverts) will need to be merged into `production` by creating a PR for `main` -> `production`.

### Enabling Drone Crons

To enable or re-enable the rebuild cron, run the following command with the drone CLI:
`drone cron add "mongodb/devcenter" "rebuild-devcenter-prod-cron" @hourly --branch "production"`

## Formatting

We use [Prettier](https://prettier.io/) in order to keep consistent code styling. Run `yarn format:write` to format the code in the project with Prettier. Alternatively, if you use VS Code, download the Prettier extension and configure it as your default JS/TS formatter. You can then point it to use the rules set out in `.prettierrc` and format on save/type. 

If you use a different editor or don't want this functionality, the pre-commit hook defined in `.linstagedrc.js` will automatically format on commit so that you don't have to worry about formatting if you don't want to.

## Bundle Analyzer

This project uses `@next/bundle-analyzer` to analyze our webpack bundles. If you want to analyze while building, build with the `yarn build:analyze` command. This will allow the build to generate html files that show a bundle analysis. See [the `webpack-bundle-analyzer` repo](https://github.com/webpack-contrib/webpack-bundle-analyzer) for more info on the underlying tool.

## Preview Environment

When a PR is opened or update, a preview environment on Kanopy will be deployed. The URL for this environment will be available in the logs for the preview build step of the PR checks (maybe we can add functionality to have this URL in a comment on the PR, but that's actuaslly kinda difficult). It may take a minute or 2 for the preview enviornment to fully deploy after it has been built.

This environment should then be deleted when the PR is closed/merged. In the case that it does not get deleted, use `helm` to manually uninstall that deployment.