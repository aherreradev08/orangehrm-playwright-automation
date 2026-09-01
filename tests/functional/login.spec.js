import { test } from '../../fixtures/testFixtures';

test.describe('Login', () => {
	test('TC_01 @smoke', async ({ loginPage }) => {
		await loginPage.verifyLoginElements();
	});

	test('TC_02 @smoke', async ({ loginPage }) => {
		await loginPage.login(
			process.env.ADMIN_USERNAME,
			process.env.ADMIN_PASSWORD,
		);
		await loginPage.expectLoggedIn();
	});

	test('TC_03', async ({ loginPage }) => {
		await loginPage.login('admin123', 'admin321');
		await loginPage.expectLoginError(/invalid credential/i);
	});

	test('TC_04', async ({ loginPage }) => {
		await loginPage.login(" ' OR '1'='1", 'password');
		await loginPage.expectLoginError(/invalid credential/i);
	});

	test('TC_05', async ({ loginPage }) => {
		await loginPage.onForgetPasswordClick();
	});
});
