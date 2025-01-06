import { Page } from '@playwright/test';
import { RangePage } from './rangePage';

export class Exercise1Page extends RangePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('localhost:3000/exercise1');
  }

  async changeMinValue(value: string) {
    await this.minInput.fill(value);
    await this.minInput.blur();
  }

  async changeMaxValue(value: string) {
    await this.maxInput.fill(value);
    await this.maxInput.blur();
  }
}
