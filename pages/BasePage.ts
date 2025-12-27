import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
