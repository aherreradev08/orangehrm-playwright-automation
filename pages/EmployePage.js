import { expect } from 'playwright/test';
export class EmployeePage {
	constructor(page) {
		this.page = page;

		this.employeeLink = page.getByRole('link', { name: 'PIM' });
		this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
		this.firstnameInput = page.getByPlaceholder('First Name');
		this.middlenameInput = page.getByPlaceholder('Middle Name');
		this.lastnameInput = page.getByPlaceholder('Last Name');
		this.employeeIDInput = page.getByRole('textbox').nth(4);
		this.saveButton = page.getByRole('button', { name: 'Save' });
		this.errorMessage = page.getByText('Required', { exact: true });
		this.photoInput = page.locator('button.employee-image-action');
		this.photoErrorMessage = page.locator('.oxd-input-field-error-message');
	}

	async goToAddEmployee() {
		await this.employeeLink.click();
		await this.addEmployeeButton.click();
		await expect(this.page).toHaveURL(/addemployee/i);
	}

	async addEmployee(firstname, lastname) {
		await this.goToAddEmployee();
		await this.firstnameInput.fill(firstname);
		await this.lastnameInput.fill(lastname);
		await this.employeeIDInput.clear();
		await this.saveButton.click();
		await expect(this.page).toHaveURL(/viewPersonalDetails/i);
	}
	async addEmployeeWithCompleteDetails(
		firstname,
		middlename,
		lastname,
		employeeID,
	) {
		await this.goToAddEmployee();
		await this.firstnameInput.fill(firstname);
		await this.middlenameInput.fill(middlename);
		await this.lastnameInput.fill(lastname);
		await this.employeeIDInput.fill(employeeID);
		await this.saveButton.click();
		await expect(this.page).toHaveURL(/viewPersonalDetails/i);
	}

	async addEmployeeWithoutFirstName(lastname) {
		await this.goToAddEmployee();
		await this.lastnameInput.fill(lastname);
		await this.employeeIDInput.clear();
		await this.saveButton.click();
		await expect(this.errorMessage).toBeVisible();
	}

	async addEmployeeWithUnsupportedFile() {
		await this.goToAddEmployee();

		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.photoInput.click();
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles('test-data/unsupported-photo.txt');
		await expect(this.photoErrorMessage).toHaveText('File type not allowed');
	}

	async addEmployeeWithMaximumFileSize() {
		await this.goToAddEmployee();

		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.photoInput.click();
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles('test-data/photo-2mb.jpg');
		await expect(this.photoErrorMessage).toHaveText('Attachment Size Exceeded');
	}
}
