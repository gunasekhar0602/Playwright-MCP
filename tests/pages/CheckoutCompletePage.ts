import { type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly heading: Locator;
  readonly dispatchMessage: Locator;
  readonly cartButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.dispatchMessage = page.getByText(/Your order has been dispatched/);
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
  }

  async backHome(): Promise<void> {
    await this.page.getByRole('button', { name: 'Back Home' }).click();
  }
}
