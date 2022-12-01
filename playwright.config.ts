// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './playwright-tests',
    webServer: {
        command: 'yarn start',
        port: 3000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        screenshot: 'only-on-failure',
    },
    outputDir: './playwright-artifacts',
    timeout: 120 * 1000,
};
export default config;
