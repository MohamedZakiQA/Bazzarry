import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) { super(page); }

  async removeProduct(name: string) {
    await this.page.locator('.cart_item', { hasText: name }).getByRole('button', { name: 'REMOVE' }).click();
  }

  async getCartItems() {
    const items = [];
    for (const row of await this.page.locator('.cart_item').all()) {
      items.push({
        name: await row.locator('.inventory_item_name').textContent(),
        price: await row.locator('.inventory_item_price').textContent()
      });
    }
    return items;
  }

  async checkout() {
    await this.page.click('#checkout');
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    return (await badge.isVisible()) ? parseInt(await badge.textContent() || '0') : 0;
  }

  async isCartEmpty() {
    return (await this.page.locator('.cart_item').count()) === 0;
  }

  async continueShopping() {
    await this.page.click('#continue-shopping');
  }
}
