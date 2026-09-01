import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeePage } from '../pages/employePage';

export const test = base.extend({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await use(loginPage);
	},
	authenticatedPage: async ({ loginPage }, use) => {
		await loginPage.login('Admin', 'admin123');
		await loginPage.expectLoggedin();
		await use();
	},

	dashboardPage: async ({ page, authenticatedPage }, use) => {
		const dashboardPage = new DashboardPage(page);
		await use(dashboardPage);
	},

	employeePage: async ({ page, authenticatedPage }, use) => {
		const employeePage = new EmployeePage(page);
		await use(employeePage);
	},
});

export { expect } from '@playwright/test';
