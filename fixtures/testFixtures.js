import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeePage } from '../pages/EmployeePage.js';

export const test = base.extend({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);

		await loginPage.goto();

		await use(loginPage);
	},

	authenticatedPage: async ({ loginPage, page }, use) => {
		await loginPage.login(
			process.env.ADMIN_USERNAME,
			process.env.ADMIN_PASSWORD,
		);

		await loginPage.expectLoggedIn();

		await use(page);
	},

	dashboardPage: async ({ authenticatedPage }, use) => {
		const dashboardPage = new DashboardPage(authenticatedPage);

		await use(dashboardPage);
	},

	employeePage: async ({ authenticatedPage }, use) => {
		const employeePage = new EmployeePage(authenticatedPage);

		await use(employeePage);
	},
});

export { expect } from '@playwright/test';
