import { test } from '../../fixtures/testFixtures';

test.describe('Add Employee', () => {
	test('TC_08', async ({ employeePage }) => {
		await employeePage.addEmployee('john', 'last');
	});

	test('TC_09', async ({ employeePage }) => {
		await employeePage.addEmployeeWithCompleteDetails(
			'aa',
			'bb',
			'cc',
			'00099',
		);
	});
	test('TC_10', async ({ employeePage }) => {
		await employeePage.addEmployeeWithoutFirstName('last');
	});

	test.only('TC_11', async ({ employeePage }) => {
		await employeePage.addEmployeeWithUnsupportedFile();
	});

	test.only('TC_12', async ({ employeePage }) => {
		await employeePage.addEmployeeWithMaximumFileSize();
	});
});
