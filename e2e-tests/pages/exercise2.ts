import { Page } from '@playwright/test';
import { RangePage } from './rangePage';

export class Exercise2Page extends RangePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('localhost:3000/exercise2');
  }
}
