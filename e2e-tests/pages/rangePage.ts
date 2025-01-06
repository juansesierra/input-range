import { Locator, Page } from '@playwright/test';

export class RangePage {
  readonly page: Page;
  readonly minInput: Locator;
  readonly maxInput: Locator;
  readonly minBullet: Locator;
  readonly maxBullet: Locator;
  readonly sliderTrack: Locator;

  constructor(page: Page) {
    this.page = page;
    this.minInput = page.locator('#min-input');
    this.maxInput = page.locator('#max-input');
    this.minBullet = page.getByTestId('slider-value').first();
    this.maxBullet = page.getByTestId('slider-value').nth(1);
    this.sliderTrack = page.locator('#slider');
  }

  async getTrackWidth() {
    return await this.sliderTrack.evaluate((el) => {
      return el.getBoundingClientRect().width;
    });
  }

  async getBulletWidth() {
    return await this.minBullet.evaluate((el) => {
      return el.getBoundingClientRect().width;
    });
  }

  async getBulletPosition(bullet: Locator) {
    return await bullet.evaluate((el) => {
      return el.getBoundingClientRect().x;
    });
  }

  async changeMinValue(value: string) {
    await this.minInput.fill(value);
    await this.minInput.blur();
  }

  async changeMaxValue(value: string) {
    await this.maxInput.fill(value);
    await this.maxInput.blur();
  }

  async slideMinTo(position: number) {
    await this.minBullet.dragTo(this.sliderTrack, {
      force: true,
      targetPosition: { x: position, y: 0 },
      timeout: 3000,
    });
  }

  async slideMaxTo(position: number) {
    await this.maxBullet.dragTo(this.sliderTrack, {
      force: true,
      targetPosition: { x: position, y: 0 },
      timeout: 3000,
    });
  }
}
