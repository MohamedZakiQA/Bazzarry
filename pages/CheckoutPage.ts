import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) { super(page); }

  // Step 1: Information
  async fillInformation(info: { firstName: string, lastName: string, zipCode: string }) {
    await this.page.fill('#first-name', info.firstName);
    await this.page.fill('#last-name', info.lastName);
    await this.page.fill('#postal-code', info.zipCode);
    await this.page.click('#continue');
  }

  async hasError() {
    return await this.page.locator('[data-test="error"]').isVisible();
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').textContent();
  }

  // Step 2: Overview
  async finishOrder() {
    await this.page.click('#finish');
  }

  async getDisplayedProducts() {
    const products = [];
    for (const row of await this.page.locator('.cart_item').all()) {
      products.push({
        name: await row.locator('.inventory_item_name').textContent(),
        price: await row.locator('.inventory_item_price').textContent()
      });
    }
    return products;
  }

  // Step 3: Complete
  async isOrderComplete() {
    return await this.page.locator('.complete-header').isVisible();
  }

  async getSuccessMessage() {
    return await this.page.locator('.complete-header').textContent();
  }
}
