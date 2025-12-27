import { expect, test } from '../fixtures/baseTest';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';
import { checkoutInfo, products } from '../utils/testData';

test('TC-005 @p0 @regression - Product consistency across pages', async ({ loggedInPage }) => {
  const productsPage = new ProductsPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);
  const item = products.backpack;

  // Verify on Products page
  const details = await productsPage.getProductDetails(item.name);
  expect(details.name).toBe(item.name);
  expect(details.price).toBe(item.price);

  // Verify in Cart
  await productsPage.addProductToCart(item.name);
  await productsPage.goToCart();
  const cartItems = await cartPage.getCartItems();
  expect(cartItems[0].name).toBe(item.name);
  expect(cartItems[0].price).toBe(item.price);

  // Verify on Overview
  await cartPage.checkout();
  await checkoutPage.fillInformation(checkoutInfo.valid);
  const overviewItems = await checkoutPage.getDisplayedProducts();
  expect(overviewItems[0].name).toBe(item.name);
  expect(overviewItems[0].price).toBe(item.price);
});
