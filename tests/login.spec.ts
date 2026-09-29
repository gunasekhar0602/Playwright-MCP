import { test, expect } from './fixtures/customFixtures';

test.describe('Core Shopping Journey', () => {
  test('Sign in with valid and invalid credentials', async ({ page, loginPage, inventoryPage }) => {
    // 1. Start from a fresh session at https://www.saucedemo.com/. Submit an incorrect username and password.
    await loginPage.goto();
    await loginPage.loginWithCredentials('invalid_user', 'incorrect_password');
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(loginPage.errorMessage).toBeVisible();

    // 2. Replace the credentials with username standard_user and password secret_sauce, then select Login.
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.cartButton).toBeVisible();
  });
});
