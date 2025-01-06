import { expect, test } from '@playwright/test';
import { Exercise2Page } from './pages/exercise2';

let exercise2Page: Exercise2Page;

test.beforeEach(async ({ page }) => {
  await page.route('http://demo7841693.mockable.io/range/values', async (route) => {
    const values = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    await route.fulfill({ json: values });
  });

  exercise2Page = new Exercise2Page(page);
  await exercise2Page.goto();
});

test('Range is rendered correctly', async () => {
  const minValue = await exercise2Page.minInput.inputValue();
  const maxValue = await exercise2Page.maxInput.inputValue();

  expect(minValue).toBe('0');
  expect(maxValue).toBe('100');

  expect(await exercise2Page.minInput.isDisabled()).toBe(true);
  expect(await exercise2Page.maxInput.isDisabled()).toBe(true);
});

test.describe('Slide min value', async () => {
  test('Cannot slide less than the min value', async () => {
    await exercise2Page.slideMinTo(-100);

    expect(await exercise2Page.minInput.inputValue()).toBe('0');
  });

  test('Cannot slide more than the max value', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    await exercise2Page.slideMinTo(sliderTrackWidth + 100);

    expect(await exercise2Page.minInput.inputValue()).toBe('0');
  });

  test('Slide to the half page', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    await exercise2Page.slideMinTo(sliderTrackWidth / 2);

    expect(await exercise2Page.minInput.inputValue()).toBe('50');
  });

  test('Slide to aprox the value before', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    await exercise2Page.slideMinTo(sliderTrackWidth * 0.73);

    expect(await exercise2Page.minInput.inputValue()).toBe('70');
  });

  test('Slide to aprox the value after', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    await exercise2Page.slideMinTo(sliderTrackWidth * 0.77);

    expect(await exercise2Page.minInput.inputValue()).toBe('80');
  });
});

test.describe('Slide max value', async () => {
  test('Cannot slide less than the min value', async () => {
    const bulletWidth = await exercise2Page.getBulletWidth();
    await exercise2Page.slideMaxTo(-bulletWidth);

    expect(await exercise2Page.maxInput.inputValue()).toBe('100');
  });

  test('Cannot slide more than the max value', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    const bulletWidth = await exercise2Page.getBulletWidth();

    await exercise2Page.slideMaxTo(sliderTrackWidth + bulletWidth);

    expect(await exercise2Page.maxInput.inputValue()).toBe('100');
  });

  test('Slide to aprox the value before', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    await exercise2Page.slideMaxTo(sliderTrackWidth * 0.33);

    expect(await exercise2Page.maxInput.inputValue()).toBe('30');
  });

  test('Slide to aprox the value after', async () => {
    const sliderTrackWidth = await exercise2Page.getTrackWidth();
    await exercise2Page.slideMaxTo(sliderTrackWidth * 0.37);

    expect(await exercise2Page.maxInput.inputValue()).toBe('40');
  });
});
