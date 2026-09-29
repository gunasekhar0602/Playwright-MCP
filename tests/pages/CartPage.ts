import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;
  readonly cartButton: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
  }

  getCartItem(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  cartItemQuantity(productName: string): Locator {
    return this.getCartItem(productName).locator('.cart_quantity');
  }

  async removeProduct(productName: string): Promise<void> {
    await this.getCartItem(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}
