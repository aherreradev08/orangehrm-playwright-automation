import { test, expect } from '../../fixtures/testFixtures';

test.describe('Dashboard', () => {
	test('TC_06 @smoke', async ({ dashboardPage }) => {
		await dashboardPage.onDashboardVerify();
	});

	test('TC_07a - Assign Leave quick launch', async ({ dashboardPage }) => {
		await dashboardPage.onAssignLeaveClick();
	});

	test('TC_07b - Leave List quick launch', async ({ dashboardPage }) => {
		await dashboardPage.onLeaveListClick();
	});

	test('TC_07c - Timesheets quick launch', async ({ dashboardPage }) => {
		await dashboardPage.onTimesheetsClick();
	});

	test('TC_07d - Apply Leave quick launch', async ({ dashboardPage }) => {
		await dashboardPage.onApplyLeaveClick();
	});

	test('TC_07e - My Leave quick launch', async ({ dashboardPage }) => {
		await dashboardPage.onMyLeaveClick();
	});

	test('TC_07f - My Timesheet quick launch', async ({ dashboardPage }) => {
		await dashboardPage.onMyTimesheetClick();
	});
});
