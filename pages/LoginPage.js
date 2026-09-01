import { expect } from '@playwright/test';

export class LoginPage {
	constructor(page) {
		this.page = page;

		this.usernameInput = page.getByPlaceholder('Username');
		this.passwordInput = page.getByPlaceholder('Password');
		this.loginButton = page.getByRole('button', { name: /login/i });
		this.errorMessage = page.getByRole('alert');
		this.logo = page.locator('img[alt="company-branding"]');
		this.forgotPassword = page.getByText('Forgot your password?');
		this.resetPassword = page.getByRole('heading', {
			name: 'Reset Password',
		});
	}

	async goto() {
		await this.page.goto('/web/index.php/auth/login');
	}

	async login(username, password) {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}

	async expectLoggedIn() {
		await expect(this.page).toHaveURL(/\/dashboard\/index/);
	}

	async expectLoginError(message) {
		await expect(this.errorMessage).toContainText(message);
	}

	async verifyLoginElements() {
		await expect(this.usernameInput).toBeVisible();
		await expect(this.passwordInput).toBeVisible();
		await expect(this.loginButton).toBeVisible();
		await expect(this.logo).toBeVisible();
		await expect(this.forgotPassword).toBeVisible();
	}

	async onForgotPasswordClick() {
		await this.forgotPassword.click();

		await expect(this.page).toHaveURL(/requestPasswordResetCode/i);

		await expect(this.resetPassword).toHaveText(/Reset Password/i);
	}
}
