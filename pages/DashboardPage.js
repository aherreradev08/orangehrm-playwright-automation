import { expect } from '@playwright/test';

export class DashboardPage {
	constructor(page) {
		this.page = page;

		this.dashboard = page.getByRole('heading', { name: 'Dashboard' });
		this.timeAtWork = page.getByText('Time at Work', { exact: true });
		this.myActions = page.getByText('My Actions', { exact: true });
		this.quickLaunch = page.getByText('Quick Launch', { exact: true });

		this.assignLeaveIcon = page.getByRole('button', { name: 'Assign Leave' });
		this.leaveListIcon = page.getByRole('button', { name: 'Leave List' });
		this.timesheetsIcon = page.getByRole('button', { name: 'Timesheets' });
		this.applyLeaveIcon = page.getByRole('button', { name: 'Apply Leave' });
		this.myLeaveIcon = page.getByRole('button', { name: 'My Leave' });
		this.myTimesheetIcon = page.getByRole('button', {
			name: 'My Timesheet',
		});
	}

	async onDashboardVerify() {
		await expect(this.dashboard).toBeVisible();
		await expect(this.myActions).toBeVisible();
		await expect(this.timeAtWork).toBeVisible();
		await expect(this.quickLaunch).toBeVisible();
	}

	// Generic helper: click one quick-launch icon and verify navigation.
	async clickQuickLaunchIcon(icon, expectedUrl) {
		await icon.click();
		await expect(this.page).toHaveURL(expectedUrl);
		await this.page.goBack();
		await expect(this.dashboard).toBeVisible();
	}

	async onAssignLeaveClick() {
		await this.clickQuickLaunchIcon(this.assignLeaveIcon, /assignLeave/i);
	}

	async onLeaveListClick() {
		await this.clickQuickLaunchIcon(this.leaveListIcon, /viewLeaveList/i);
	}

	async onTimesheetsClick() {
		await this.clickQuickLaunchIcon(
			this.timesheetsIcon,
			/viewEmployeeTimesheet/i,
		);
	}

	async onApplyLeaveClick() {
		await this.clickQuickLaunchIcon(this.applyLeaveIcon, /applyLeave/i);
	}

	async onMyLeaveClick() {
		await this.clickQuickLaunchIcon(this.myLeaveIcon, /viewMyLeaveList/i);
	}

	async onMyTimesheetClick() {
		await this.clickQuickLaunchIcon(this.myTimesheetIcon, /viewMyTimesheet/i);
	}
}
