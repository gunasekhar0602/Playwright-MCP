import { test, expect } from './fixtures/customFixtures';

test.describe('Core Shopping Journey', () => {
  test('Browse, sort, inspect, and add a product', async ({ loginPage, inventoryPage, productDetailsPage }) => {
    // 1. From a fresh session, sign in as standard_user with password secret_sauce.
    await loginPage.goto();
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
    await expect(inventoryPage.sortControl).toBeVisible();

    // 2. Change the sort order to Price (low to high).
    await inventoryPage.sortProductsBy('Price (low to high)');
    await expect(inventoryPage.firstProductDetailsLink).toHaveAccessibleName('View details for Sauce Labs Onesie');
    await expect(inventoryPage.productPrice('Sauce Labs Onesie')).toHaveText('$7.99');

    // 3. Open the Sauce Labs Backpack product details.
    await inventoryPage.openProductDetails('Sauce Labs Backpack');
    await expect(productDetailsPage.productName('Sauce Labs Backpack')).toBeVisible();
    await expect(productDetailsPage.description).toContainText('sleek, streamlined Sly Pack');
    await expect(productDetailsPage.price).toHaveText('$29.99');
    await expect(productDetailsPage.addToCartButton).toBeVisible();

    // 4. Select Add to cart.
    await productDetailsPage.addProductToCart();
    await expect(productDetailsPage.removeFromCartButton).toBeVisible();
    await expect(productDetailsPage.cartButton).toHaveAccessibleName('Cart, 1 items');
  });
});
