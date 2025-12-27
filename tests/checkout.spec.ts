import { expect, test } from '../fixtures/baseTest';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';
import { checkoutInfo, products } from '../utils/testData';

test.describe('Checkout Flow', () => {

  test('TC-003 @p0 @smoke - Complete checkout happy path', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const productsPage = new ProductsPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);

    await productsPage.addProductToCart(products.backpack.name);
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(checkoutInfo.valid);
    await checkoutPage.finishOrder();

    expect(await checkoutPage.isOrderComplete()).toBe(true);
  });

  test('TC-004 @p1 @regression - Checkout validation (Missing First Name)', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const productsPage = new ProductsPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);

    await productsPage.addProductToCart(products.backpack.name);
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation({ ...checkoutInfo.valid, firstName: '' });

    expect(await checkoutPage.hasError()).toBe(true);
    expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });

});
