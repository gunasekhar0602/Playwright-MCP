import { type Locator, type Page } from '@playwright/test';

export type ProductSortOption =
  | 'Name (A to Z)'
  | 'Name (Z to A)'
  | 'Price (low to high)'
  | 'Price (high to low)';

export class InventoryPage {
  readonly productsHeading: Locator;
  readonly productCards: Locator;
  readonly sortControl: Locator;
  readonly addToCartButtons: Locator;
  readonly firstProductDetailsLink: Locator;
  readonly cartButton: Locator;

  constructor(private readonly page: Page) {
    this.productsHeading = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.sortControl = page.getByRole('combobox', { name: 'Sort products' });
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.firstProductDetailsLink = page.getByRole('button', { name: /^View details for / }).first();
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
  }

  async sortProductsBy(option: ProductSortOption): Promise<void> {
    await this.sortControl.selectOption({ label: option });
  }

  async openProductDetails(productName: string): Promise<void> {
    await this.productCard(productName)
      .getByRole('button', { name: `View details for ${productName}` })
      .first()
      .click();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productCard(productName)
      .getByRole('button', { name: 'Add to cart', exact: true })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  productPrice(productName: string): Locator {
    return this.productCard(productName).getByText(/^\$\d+\.\d{2}$/);
  }

  private productCard(productName: string): Locator {
    return this.productCards.filter({ hasText: productName });
  }
}
