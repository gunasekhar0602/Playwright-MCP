import { test, expect } from './fixtures/customFixtures';

test.describe('Core Shopping Journey', () => {
  test('Review totals and complete an order', async ({ page, loginPage, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
    // 1. From a fresh session, sign in as standard_user, add Sauce Labs Backpack, open the cart, select Checkout, enter first name Test, last name Customer, and ZIP/postal code 90210, then select Continue.
    await loginPage.goto();
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutInformationPage.fillInformation('Test', 'Customer', '90210');
    await checkoutInformationPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(checkoutOverviewPage.heading).toBeVisible();
    await expect(checkoutOverviewPage.productName('Sauce Labs Backpack')).toBeVisible();
    await expect(checkoutOverviewPage.itemQuantity).toHaveText('1');
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $29.99');
    await expect(checkoutOverviewPage.paymentInformation).toContainText('SauceCard #31337');
    await expect(checkoutOverviewPage.shippingInformation).toContainText('Free Pony Express Delivery!');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');

    // 2. Review the order and select Finish.
    await checkoutOverviewPage.finishOrder();
    await expect(checkoutCompletePage.heading).toBeVisible();
    await expect(checkoutCompletePage.dispatchMessage).toContainText('Your order has been dispatched');
    await expect(checkoutCompletePage.cartButton).toHaveAccessibleName('Cart, empty');

    // 3. Select Back Home.
    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productsHeading).toBeVisible();
  });
});
