import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) { super(page); }

  async addProductToCart(name: string) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    await this.page.click(`#add-to-cart-${id}`);
  }

  async getCartCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    return (await badge.isVisible()) ? parseInt(await badge.textContent() || '0') : 0;
  }

  async isProductInCart(name: string) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    return await this.page.locator(`#remove-${id}`).isVisible();
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async getProductDetails(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    return {
      name: await item.locator('.inventory_item_name').textContent(),
      price: await item.locator('.inventory_item_price').textContent()
    };
  }
}
