import { expect } from '@playwright/test';

export class EmployeePage {
	constructor(page) {
		this.page = page;

		this.employeeLink = page.getByRole('link', { name: 'PIM' });
		this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
		this.firstnameInput = page.getByPlaceholder('First Name');
		this.middlenameInput = page.getByPlaceholder('Middle Name');
		this.lastnameInput = page.getByPlaceholder('Last Name');

		// Locate the Employee Id field by its label instead of a positional
		// index, so it doesn't silently break if the form layout changes.
		this.employeeIDInput = page
			.locator('.oxd-input-group')
			.filter({ has: page.locator('label', { hasText: 'Employee Id' }) })
			.locator('input');

		this.saveButton = page.getByRole('button', { name: 'Save' });
		this.errorMessage = page.getByText('Required', { exact: true });
		this.photoInput = page.locator('button.employee-image-action');
		this.photoErrorMessage = page.locator('.oxd-input-field-error-message');
		this.searchEmployeeNameInput = page
			.getByRole('textbox', { name: 'Type for hints...' })
			.first();
		this.searchEmployeeId = page.getByRole('textbox').nth(2);
		this.searchButton = page.getByRole('button', { name: 'Search' });
		this.searchResultError = page.locator('#oxd-toaster_1');
	}

	async goToAddEmployee() {
		await this.employeeLink.click();
		await this.addEmployeeButton.click();
		await this.page.waitForURL(/addemployee/i);
		await expect(this.page).toHaveURL(/addemployee/i);
	}

	async addEmployee(firstname, lastname) {
		await this.goToAddEmployee();
		await this.firstnameInput.fill(firstname);
		await this.lastnameInput.fill(lastname);
		await this.employeeIDInput.clear();
		await this.saveButton.click();
		await this.page.waitForURL(/viewPersonalDetails/i);
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

		// The site auto-populates this field via an async call after the
		// page loads. Wait for that value to land before overwriting it,
		// otherwise our fill can get raced/overwritten by the page's own JS.
		await expect(this.employeeIDInput).not.toHaveValue('');
		await this.employeeIDInput.fill(employeeID);
		await expect(this.employeeIDInput).toHaveValue(employeeID);

		await this.saveButton.click();
		await this.page.waitForURL(/viewPersonalDetails/i);
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

	async searchByEmployeeName(employeeName) {
		await this.employeeLink.click();

		await this.searchEmployeeNameInput.fill(employeeName);
		await this.searchButton.click();

		const matchingRow = this.page
			.locator('.oxd-table-body .oxd-table-card')
			.filter({ hasText: new RegExp(employeeName, 'i') });

		await expect(matchingRow.first()).toBeVisible();
	}

	async searchByEmployeeId(employeeID) {
		await this.employeeLink.click();

		await this.searchEmployeeId.fill(employeeID);
		await this.searchButton.click();

		const matchingRow = this.page
			.locator('.oxd-table-body .oxd-table-card')
			.filter({ hasText: new RegExp(employeeID, 'i') });

		await expect(matchingRow.first()).toBeVisible();
	}

	async noSearchResult(employeeName) {
		await this.employeeLink.click();
		await this.searchEmployeeNameInput.fill(employeeName);
		await this.searchButton.click();
		await expect(this.searchResultError).toHaveText(/No Records Found/i);
	}
}
