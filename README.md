# OrangeHRM Playwright Automation

Automated end-to-end tests for the OrangeHRM demo HR application, built with Playwright Test and JavaScript.

## Overview

This project covers key user flows on OrangeHRM, including:

- Login (authentication flows)
- Dashboard verification after login
- Employee management, including profile photo upload validation (valid, oversized, and unsupported file types)

## Tech Stack

- Playwright Test — test runner and browser automation
- JavaScript
- Node.js
- GitHub Actions — CI/CD
- Jira — test case and defect management

## Project Structure

```
.
├── tests/functional/
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   └── employee.spec.js
├── pages/                     # Page Object Model classes
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   └── EmployeePage.js
├── fixtures/
│   └── testFixtures.js        # Custom fixtures
├── test-data/
│   ├── photo.jpg
│   ├── photo-2mb.jpg
│   └── unsupported-photo.txt
├── .github/workflows/
│   └── playwright.yml
├── playwright.config.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js v18 or later
- npm (comes with Node.js)

## Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/functional/login.spec.js
```

Run tests by tag:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

Run tests in headed mode (see the browser):

```bash
npx playwright test --headed
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

## Viewing the Test Report

After a test run, view the HTML report:

```bash
npx playwright show-report
```

_(Exact reporter configuration is defined in `playwright.config.js`.)_

## Test Data

Static assets used for upload/validation scenarios, stored under `test-data/`:

| File                    | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `photo.jpg`             | Valid profile photo upload                  |
| `photo-2mb.jpg`         | Oversized file to test upload size limits   |
| `unsupported-photo.txt` | Invalid file type to test format validation |

## Configuration

Key settings live in `playwright.config.js`, including:

- Base URL: `https://opensource-demo.orangehrmlive.com`
- Browsers: Chromium, Firefox, WebKit
- Screenshot capture on failure

## Automation Features

**Implemented**

- Page Object Model (POM)
- Custom Playwright fixtures
- Cross-browser execution (Chromium, Firefox, WebKit)
- Test tagging (`@smoke`, `@regression`)
- Parallel execution
- Screenshots on failure

**Planned**

- Data-driven testing using JS objects/JSON (in progress)

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`):

```
Checkout → Install dependencies → Install Playwright → Run tests → Generate report → Upload artifacts
```

- Runs on every push
- Runs on a nightly schedule
- Credentials are stored via GitHub Secrets, not hardcoded

## Jira / Defect Management

Jira is used for test case management and bug reporting. This is currently a manual workflow — no direct Jira API/CI integration is implemented.

## Future Improvements

- Complete data-driven testing implementation
- Expand coverage to additional OrangeHRM modules
- Explore API-level testing
- Evaluate direct Jira integration
- Add trace/video capture for failure diagnostics
