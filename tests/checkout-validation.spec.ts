import { test, expect } from '../fixtures/customFixtures';

test.describe('Core Shopping Journey', () => {
  test('Validate checkout information', async ({ authenticatedPage: page, inventoryPage, cartPage, checkoutInformationPage }) => {
    // 1. Start with a seeded standard_user session, add one product, open the cart, and select Checkout.
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await expect(checkoutInformationPage.heading).toBeVisible();
    await expect(checkoutInformationPage.firstNameInput).toBeVisible();
    await expect(checkoutInformationPage.lastNameInput).toBeVisible();
    await expect(checkoutInformationPage.postalCodeInput).toBeVisible();

    // 2. Leave all fields empty and select Continue.
    await checkoutInformationPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(checkoutInformationPage.errorMessage).toHaveText('Error: First Name is required');

    // 3. Enter a first name only and select Continue.
    await checkoutInformationPage.firstNameInput.fill('Test');
    await checkoutInformationPage.continueButton.click();
    await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Last Name is required');

    // 4. Enter a last name but leave ZIP/postal code empty, then select Continue.
    await checkoutInformationPage.lastNameInput.fill('Customer');
    await checkoutInformationPage.continueButton.click();
    await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Postal Code is required');

    // 5. Enter a valid ZIP/postal code and select Continue.
    await checkoutInformationPage.postalCodeInput.fill('90210');
    await checkoutInformationPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
  });
});
