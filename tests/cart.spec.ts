import { expect, test } from '../fixtures/baseTest';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { products } from '../utils/testData';

test.describe('Cart Operations', () => {

  test('TC-001 @p0 @smoke - Add single product to cart', async ({ loggedInPage }) => {
    const productsPage = new ProductsPage(loggedInPage);
    const name = products.backpack.name;

    await productsPage.addProductToCart(name);
    expect(await productsPage.getCartCount()).toBe(1);
    expect(await productsPage.isProductInCart(name)).toBe(true);
  });

  test('TC-002 @p0 @smoke - Remove product from cart', async ({ loggedInPage }) => {
    const productsPage = new ProductsPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const name = products.backpack.name;

    await productsPage.addProductToCart(name);
    await productsPage.goToCart();
    await cartPage.removeProduct(name);

    expect(await cartPage.isCartEmpty()).toBe(true);
    expect(await cartPage.getCartBadgeCount()).toBe(0);
  });

});
