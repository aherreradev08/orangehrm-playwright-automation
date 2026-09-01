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
		this.myTimesheetIcon = page.getByRole('button', { name: 'My Timesheet' });
	}

	async onDashboardVerify() {
		await expect(this.dashboard).toBeVisible();
		await expect(this.myActions).toBeVisible();
		await expect(this.timeAtWork).toBeVisible();
		await expect(this.quickLaunch).toBeVisible();
	}

	async onQuickLaunchClick() {
		const quickLaunches = [
			{
				icon: this.assignLeaveIcon,
				expectedUrl: /assignLeave/i,
			},
			{
				icon: this.leaveListIcon,
				expectedUrl: /viewLeaveList/i,
			},
			{
				icon: this.timesheetsIcon,
				expectedUrl: /viewEmployeeTimesheet/i,
			},
			{
				icon: this.applyLeaveIcon,
				expectedUrl: /applyLeave/i,
			},
			{
				icon: this.myLeaveIcon,
				expectedUrl: /viewMyLeaveList/i,
			},
			{
				icon: this.myTimesheetIcon,
				expectedUrl: /viewMyTimesheet/i,
			},
		];
		for (const { icon, expectedUrl } of quickLaunches) {
			await icon.click();
			await expect(this.page).toHaveURL(expectedUrl);
			await this.page.goBack();
		}
	}
}
