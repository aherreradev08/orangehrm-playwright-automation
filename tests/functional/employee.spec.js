import { test } from '../../fixtures/testFixtures';
import { EmployeePage } from '../../pages/EmployeePage';

test.describe('Add Employee', () => {
	test('TC_08', async ({ employeePage }) => {
		await employeePage.addEmployee('john', 'last');
	});

	test('TC_09 @smoke', async ({ employeePage }) => {
		const employeeID = String(Date.now()).slice(-4);
		await employeePage.addEmployeeWithCompleteDetails(
			'aaa',
			'bb',
			'cc',
			employeeID,
		);
	});
	test('TC_10', async ({ employeePage }) => {
		await employeePage.addEmployeeWithoutFirstName('last');
	});

	test('TC_11', async ({ employeePage }) => {
		await employeePage.addEmployeeWithUnsupportedFile();
	});

	test('TC_12', async ({ employeePage }) => {
		await employeePage.addEmployeeWithMaximumFileSize();
	});

	test('TC_13 @smoke', async ({ employeePage }) => {
		await employeePage.searchByEmployeeName('aaa');
	});

	test('TC_14', async ({ employeePage }) => {
		await employeePage.searchByEmployeeId('123');
	});

	test.only('TC_15', async ({ employeePage }) => {
		await employeePage.noSearchResult('pppppp');
	});
});
