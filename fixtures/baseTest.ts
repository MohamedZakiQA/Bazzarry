/*
 * Single fixture: provides a logged-in Playwright Page.
 */
import { test as base, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/v1/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    // Navigate and login
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html');

    await use(page);
  }
});

export { expect } from '@playwright/test';

