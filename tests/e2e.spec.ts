import { expect, test } from '../fixtures/baseTest';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';
import { checkoutInfo, products } from '../utils/testData';

test('TC-006 @p0 @regression - Full End-to-End user journey', async ({ loggedInPage }) => {
  const productsPage = new ProductsPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);

  // Add 3 products
  await productsPage.addProductToCart(products.backpack.name);
  await productsPage.addProductToCart(products.bikeLight.name);
  await productsPage.addProductToCart(products.boltTShirt.name);
  expect(await productsPage.getCartCount()).toBe(3);

  // Remove 1 product
  await productsPage.goToCart();
  await cartPage.removeProduct(products.bikeLight.name);
  expect(await cartPage.getCartBadgeCount()).toBe(2);

  // Finish checkout
  await cartPage.checkout();
  await checkoutPage.fillInformation(checkoutInfo.valid);
  await checkoutPage.finishOrder();

  expect(await checkoutPage.isOrderComplete()).toBe(true);
  expect(await checkoutPage.getSuccessMessage()).toContain('Thank you for your order!');
});
