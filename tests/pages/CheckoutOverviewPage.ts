import { type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly heading: Locator;
  readonly itemQuantity: Locator;
  readonly itemTotal: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText('Checkout: Overview', { exact: true });
    this.itemQuantity = page.locator('.cart_quantity');
    this.itemTotal = page.getByText('Item total: $29.99', { exact: true });
    this.paymentInformation = page.getByText('SauceCard #31337', { exact: true });
    this.shippingInformation = page.getByText('Free Pony Express Delivery!', { exact: true });
    this.tax = page.getByText('Tax: $2.40', { exact: true });
    this.total = page.getByText('Total: $32.39', { exact: true });
  }

  productName(name: string): Locator {
    return this.page.getByRole('button', { name: `View details for ${name}` });
  }

  async finishOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}
