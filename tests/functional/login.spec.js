import { test } from '../../fixtures/testFixtures';

test.describe('Login', () => {
	test('TC_001 @smoke', async ({ loginPage }) => {
		await loginPage.verifyLoginElements();
	});

	test('TC_002 @smoke', async ({ loginPage }) => {
		await loginPage.login(
			process.env.ADMIN_USERNAME,
			process.env.ADMIN_PASSWORD,
		);
		await loginPage.expectLoggedIn();
	});

	test('TC_003', async ({ loginPage }) => {
		await loginPage.login('admin123', 'admin123');
		await loginPage.expectLoginError(/invalid credential/i);
	});

	test('TC_004', async ({ loginPage }) => {
		await loginPage.login(" ' OR '1'='1", 'password');
		await loginPage.expectLoginError(/invalid credential/i);
	});

	test('TC_005', async ({ loginPage }) => {
		await loginPage.onForgotPasswordClick();
	});
});
