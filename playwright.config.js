// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('DEBUG — BASE_URL:', process.env.BASE_URL);
console.log('DEBUG — ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
console.log(
	'DEBUG — ADMIN_PASSWORD:',
	process.env.ADMIN_PASSWORD ? '(set)' : '(missing)',
);

const baseURL = process.env.BASE_URL;

if (!baseURL) {
	throw new Error('BASE_URL environment variable is not defined');
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Cap workers everywhere so tests aren't starved of CPU on a slow machine */
	workers: process.env.CI ? 1 : 4,

	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		['list'],
		[
			'html',
			{
				outputFolder: 'playwright-report',
				open: 'never',
			},
		],
	],

	/* Give assertions more room to retry before failing, matching the
	   generous action/navigation timeouts below. */
	expect: {
		timeout: 10_000,
	},

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		baseURL: process.env.BASE_URL,
		trace: 'on-first-retry',
		actionTimeout: 60000,
		navigationTimeout: 60000,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
