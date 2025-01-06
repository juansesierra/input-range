import { expect, test } from '@playwright/test';
import { Exercise1Page } from './pages/exercise1';

let exercise1Page: Exercise1Page;

test.beforeEach(async ({ page }) => {
  await page.route('http://demo7841693.mockable.io/range', async (route) => {
    const json = { min: 0, max: 100 };
    await route.fulfill({ json });
  });

  exercise1Page = new Exercise1Page(page);
  await exercise1Page.goto();
});

test('Range is rendered correctly', async () => {
  const minValue = await exercise1Page.minInput.inputValue();
  const maxValue = await exercise1Page.maxInput.inputValue();

  expect(minValue).toBe('0');
  expect(maxValue).toBe('100');
});

test.describe('Slide min value', () => {
  test('Slide to the half page', async () => {
    const sliderTrackWidth = await exercise1Page.getTrackWidth();
    await exercise1Page.slideMinTo(sliderTrackWidth / 2);

    expect(await exercise1Page.minInput.inputValue()).toBe('50');
  });

  test('Slide to the end', async () => {
    const sliderTrackWidth = await exercise1Page.getTrackWidth();
    const bulletWidth = await exercise1Page.getBulletWidth();

    await exercise1Page.slideMinTo(sliderTrackWidth - bulletWidth);

    expect(await exercise1Page.minInput.inputValue()).toBe('99');
  });

  test('Cannot slide less than the min value', async () => {
    await exercise1Page.slideMinTo(-100);

    expect(await exercise1Page.minInput.inputValue()).toBe('0');
  });

  test('Cannot slide more than the max value', async () => {
    const sliderTrackWidth = await exercise1Page.getTrackWidth();
    await exercise1Page.slideMinTo(sliderTrackWidth + 100);

    expect(await exercise1Page.minInput.inputValue()).toBe('0');
  });
});

test.describe('Slide max value', () => {
  test('Slide to the half page', async () => {
    const sliderTrackWidth = await exercise1Page.getTrackWidth();
    await exercise1Page.slideMaxTo(sliderTrackWidth / 2);

    expect(await exercise1Page.maxInput.inputValue()).toBe('50');
  });

  test('Slide to the beginning', async () => {
    const bulletWidth = await exercise1Page.getBulletWidth();
    await exercise1Page.slideMaxTo(bulletWidth);

    expect(await exercise1Page.maxInput.inputValue()).toBe('1');
  });

  test('Cannot slide less than the min value', async () => {
    const bulletWidth = await exercise1Page.getBulletWidth();
    await exercise1Page.slideMaxTo(-bulletWidth);

    expect(await exercise1Page.maxInput.inputValue()).toBe('100');
  });

  test('Cannot slide more than the max value', async () => {
    const sliderTrackWidth = await exercise1Page.getTrackWidth();
    const bulletWidth = await exercise1Page.getBulletWidth();

    await exercise1Page.slideMaxTo(sliderTrackWidth + bulletWidth);

    expect(await exercise1Page.maxInput.inputValue()).toBe('100');
  });
});

test.describe('Min input', () => {
  test('Min value cannot be equal to the max value', async () => {
    await exercise1Page.changeMinValue('100');
    expect(await exercise1Page.minInput.inputValue()).toBe('0');
  });

  test('Min value cannot be greater to the max value', async () => {
    await exercise1Page.changeMinValue('110');
    expect(await exercise1Page.minInput.inputValue()).toBe('0');
  });

  test('Min value cannot be less than min', async () => {
    await exercise1Page.changeMinValue('-10');
    expect(await exercise1Page.minInput.inputValue()).toBe('0');
  });

  test('Can change the min value', async () => {
    const minBulletPositionStart = await exercise1Page.getBulletPosition(exercise1Page.minBullet);
    await exercise1Page.changeMinValue('25');
    const trackWidth = await exercise1Page.getTrackWidth();
    const minBulletPositionEnd = await exercise1Page.getBulletPosition(exercise1Page.minBullet);

    expect(await exercise1Page.minInput.inputValue()).toBe('25');
    expect(minBulletPositionEnd).toBeGreaterThan(minBulletPositionStart);
    expect(trackWidth / 4).toBe(minBulletPositionEnd - minBulletPositionStart);
  });
});

test.describe('Max input', () => {
  test('Max value cannot be equal to the min value', async () => {
    await exercise1Page.changeMaxValue('0');
    expect(await exercise1Page.maxInput.inputValue()).toBe('100');
  });

  test('Max value cannot be less than the min value', async () => {
    await exercise1Page.changeMaxValue('-10');
    expect(await exercise1Page.maxInput.inputValue()).toBe('100');
  });

  test('Max value cannot be greater than max', async () => {
    await exercise1Page.changeMaxValue('110');
    expect(await exercise1Page.maxInput.inputValue()).toBe('100');
  });

  test('Can change the max value', async () => {
    const maxBulletPositionStart = await exercise1Page.getBulletPosition(exercise1Page.maxBullet);
    await exercise1Page.changeMaxValue('25');
    const trackWidth = await exercise1Page.getTrackWidth();
    const maxBulletPositionEnd = await exercise1Page.getBulletPosition(exercise1Page.maxBullet);

    expect(await exercise1Page.maxInput.inputValue()).toBe('25');
    expect(maxBulletPositionEnd).toBeLessThan(maxBulletPositionStart);
    expect(trackWidth * 0.75).toBe(maxBulletPositionStart - maxBulletPositionEnd);
  });
});
