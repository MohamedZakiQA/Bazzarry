import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  async navigate() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.page.fill('#user-name', user);
    await this.page.fill('#password', pass);
    await this.page.click('#login-button');
  }
}
