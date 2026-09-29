import { test as base, expect } from '@playwright/test';
import { CartPage } from '../tests/pages/CartPage';
import { CheckoutCompletePage } from '../tests/pages/CheckoutCompletePage';
import { CheckoutInformationPage } from '../tests/pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../tests/pages/CheckoutOverviewPage';
import { InventoryPage } from '../tests/pages/InventoryPage';
import { LoginPage } from '../tests/pages/LoginPage';
import { ProductDetailsPage } from '../tests/pages/ProductDetailsPage';

interface PageFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
}

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  productDetailsPage: async ({ page }, use) => use(new ProductDetailsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutInformationPage: async ({ page }, use) => use(new CheckoutInformationPage(page)),
  checkoutOverviewPage: async ({ page }, use) => use(new CheckoutOverviewPage(page)),
  checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),
});

export { expect };
