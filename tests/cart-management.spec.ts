import { test, expect } from './fixtures/customFixtures';

test.describe('Core Shopping Journey', () => {
  test('Review and manage cart contents', async ({ loginPage, inventoryPage, cartPage }) => {
    // 1. From a fresh session, sign in as standard_user and add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    await loginPage.goto();
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, 2 items');

    // 2. Open the cart.
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.getCartItem('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(cartPage.getCartItem('Sauce Labs Backpack')).toContainText('sleek, streamlined Sly Pack');
    await expect(cartPage.cartItemQuantity('Sauce Labs Backpack')).toHaveText('1');
    await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toContainText('$9.99');
    await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toContainText('Water-resistant');
    await expect(cartPage.cartItemQuantity('Sauce Labs Bike Light')).toHaveText('1');

    // 3. Remove Sauce Labs Backpack from the cart.
    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.getCartItem('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.cartButton).toHaveAccessibleName('Cart, 1 items');

    // 4. Select Continue Shopping, then reopen the cart.
    await cartPage.continueShopping();
    await expect(inventoryPage.productsHeading).toBeVisible();
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toBeVisible();
  });
});
