import { fireEvent, render } from '@testing-library/react';
import { Range } from '../components/Range.tsx';

let range;
let minInput;
let maxInput;

describe('Range with min and max only', () => {
  beforeEach(() => {
    range = render(<Range min={0} max={100} />);
    maxInput = range.container.querySelector('#max-input');
    minInput = range.container.querySelector('#min-input');
  });

  test('renders Range correctly', () => {
    expect(range).toBeTruthy();
    expect(minInput.value).toBe('0');
    expect(maxInput.value).toBe('100');

    expect(minInput.disabled).not.toBeTruthy();
    expect(maxInput.disabled).not.toBeTruthy();
  });

  describe('editing min value', () => {
    test('can set any value while editing, (not blurring)', () => {
      fireEvent.change(minInput, { target: { value: '150' } });
      expect(minInput.value).toBe('150');
    });

    test('min value is saved after editing', () => {
      fireEvent.change(minInput, { target: { value: '50' } });
      fireEvent.blur(minInput);
      expect(minInput.value).toBe('50');
    });

    test('min value input is greater than min after editing', () => {
      fireEvent.change(minInput, { target: { value: '-10' } });
      fireEvent.blur(minInput);
      expect(minInput.value).toBe('0');
    });

    test('min value returns to previous value if it is greater than max value after editing', () => {
      fireEvent.change(minInput, { target: { value: '50' } });
      fireEvent.blur(minInput);
      fireEvent.change(minInput, { target: { value: '150' } });
      fireEvent.blur(minInput);
      expect(minInput.value).toBe('50');
    });

    test('min value input is less than max value after editing', () => {
      fireEvent.change(minInput, { target: { value: '150' } });
      fireEvent.blur(minInput);
      expect(minInput.value).toBe('0');
    });
  });

  describe('editing max value', () => {
    test('can set any value while editing, (not blurring)', () => {
      fireEvent.change(maxInput, { target: { value: '150' } });
      expect(maxInput.value).toBe('150');
    });

    test('max value is saved after editing', () => {
      fireEvent.change(maxInput, { target: { value: '50' } });
      fireEvent.blur(maxInput);
      expect(maxInput.value).toBe('50');
    });

    test('max value input is less than max after editing', () => {
      fireEvent.change(maxInput, { target: { value: '1000' } });
      fireEvent.blur(maxInput);
      expect(maxInput.value).toBe('100');
    });

    test('max value returns to previous value if it is less than min value after editing', () => {
      fireEvent.change(minInput, { target: { value: '50' } });
      fireEvent.blur(minInput);

      fireEvent.change(maxInput, { target: { value: '90' } });
      fireEvent.blur(maxInput);
      fireEvent.change(maxInput, { target: { value: '40' } });
      fireEvent.blur(maxInput);

      expect(maxInput.value).toBe('90');
    });

    test('max value input is less than min value after editing', () => {
      fireEvent.change(maxInput, { target: { value: '-150' } });
      fireEvent.blur(maxInput);
      expect(maxInput.value).toBe('100');
    });
  });
});

describe('Range with values', () => {
  beforeEach(() => {
    range = render(<Range values={[10, 25, 60, 70, 90]} />);
    maxInput = range.container.querySelector('#max-input');
    minInput = range.container.querySelector('#min-input');
  });

  test('renders Range correctly', () => {
    expect(range).toBeTruthy();
    expect(minInput.value).toBe('10');
    expect(maxInput.value).toBe('90');

    expect(minInput.disabled).toBeTruthy();
    expect(maxInput.disabled).toBeTruthy();
  });
});
