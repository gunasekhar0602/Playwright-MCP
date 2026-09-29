import { type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly cartButton: Locator;

  constructor(private readonly page: Page) {
    this.description = page.getByText(/carry\.allTheThings\(\)/);
    this.price = page.getByText('$29.99', { exact: true });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.removeFromCartButton = page.getByRole('button', { name: 'Remove', exact: true });
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
  }

  productName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  async addProductToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
