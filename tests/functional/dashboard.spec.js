import { test, expect } from '../../fixtures/testFixtures';

test.describe('Dashboard', () => {
	test('TC_06 @smoke', async ({ dashboardPage }) => {
		await dashboardPage.onDashboardVerify();
	});

	test.only('TC_07', async ({ dashboardPage }) => {
		await dashboardPage.onQuickLaunchClick();
	});
});
