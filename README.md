# Playwright Demo Project

This project demonstrates end-to-end and UI automation testing using [Microsoft Playwright](https://playwright.dev/) for modern web applications. It includes advanced features such as shadow DOM handling, page object model, Allure and HTML reporting, and integration with Report Portal.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Chrome browser (or other supported browsers)

## 📁 Project Structure

```
src/
├── fixtures/                 # Custom test fixtures and assertions
├── pages/                    # Page Object Model classes
│   └── ta-demo/              # Demo site page objects
├── reporters/                # Custom reporters (Slack)
├── tests/                    # Test cases
├── utils/                    # Utility functions and API helpers
├── settings.ts               # Environment configuration
│
├── playwright.config.ts # Playwright configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── .env.example         # Environment variables template
```

## 🚀 How to Run Tests

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your information (e.g. `TA_EMAIL`, `TA_PASSWORD`).

3. **Run all tests:**

   ```bash
   npx playwright test
   ```

   Run tests with tag:

   ```bash
   npx playwright test --grep @SmokeTest
   ```

   Or run a specific test file:

   ```bash
   npx playwright test tests/login-form.spec.ts
   ```

4. **Run with Allure:**
   - Reports are generated automatically (see below).

## 📊 How to View Results

- **Playwright HTML Report:**

  ```bash
  npx playwright show-report
  ```

  Opens an interactive HTML report in your browser.

- **Allure Report:**

  ```bash
  npx allure serve allure-results
  ```

  Opens the Allure report locally.

## 🧩 Features

- Modern Playwright setup with TypeScript
- Page Object Model for maintainable tests
- Shadow DOM support
- Parallel and cross-browser testing
- Allure and HTML reporting
- Example tests for login, shopping, shadow DOM, and more

## 🛠️ Useful Commands

- Run tests in headed mode: `npx playwright test --headed`
- Debug a test: `npx playwright test --debug`
- Update Playwright browsers: `npx playwright install`

## 📚 References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Allure Reporting](https://docs.qameta.io/allure/)

---

## VS Code extensions

- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Prettier code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

---

## Common agent skills



---

Feel free to contribute or open issues for improvements!
