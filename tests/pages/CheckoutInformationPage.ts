import { type Locator, type Page } from '@playwright/test';

export class CheckoutInformationPage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly errorMessage: Locator;
  readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText('Checkout: Your Information', { exact: true });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.errorMessage = page.getByRole('alert');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
}
