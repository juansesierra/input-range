import { fireEvent, render } from '@testing-library/react';
import { Range } from '@/components/Range';

describe('Range', () => {
  describe('Range with min and max only', () => {
    it('renders Range correctly', () => {
      const range = render(<Range min={0} max={100} />);
      const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;
      const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

      expect(range).toBeTruthy();
      expect(minInput.value).toBe('0');
      expect(maxInput.value).toBe('100');

      expect(minInput.disabled).not.toBeTruthy();
      expect(maxInput.disabled).not.toBeTruthy();
    });

    describe('editing min value', () => {
      it('can set any value while editing, (not blurring)', () => {
        const range = render(<Range min={0} max={100} />);
        const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '150' } });
        expect(minInput.value).toBe('150');
      });

      it('min value is saved after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '50' } });
        fireEvent.blur(minInput);
        expect(minInput.value).toBe('50');
      });

      it('min value input is greater than min after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '-10' } });
        fireEvent.blur(minInput);
        expect(minInput.value).toBe('0');
      });

      it('min value returns to previous value if it is greater than max value after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '50' } });
        fireEvent.blur(minInput);
        fireEvent.change(minInput, { target: { value: '150' } });
        fireEvent.blur(minInput);
        expect(minInput.value).toBe('50');
      });

      it('min value input is less than max value after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '150' } });
        fireEvent.blur(minInput);
        expect(minInput.value).toBe('0');
      });
    });

    describe('editing max value', () => {
      it('can set any value while editing, (not blurring)', () => {
        const range = render(<Range min={0} max={100} />);
        const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;

        fireEvent.change(maxInput, { target: { value: '150' } });
        expect(maxInput.value).toBe('150');
      });

      it('max value is saved after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;

        fireEvent.change(maxInput, { target: { value: '50' } });
        fireEvent.blur(maxInput);
        expect(maxInput.value).toBe('50');
      });

      it('max value input is less than max after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;

        fireEvent.change(maxInput, { target: { value: '1000' } });
        fireEvent.blur(maxInput);
        expect(maxInput.value).toBe('100');
      });

      it('max value returns to previous value if it is less than min value after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;
        const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '50' } });
        fireEvent.blur(minInput);

        fireEvent.change(maxInput, { target: { value: '90' } });
        fireEvent.blur(maxInput);
        fireEvent.change(maxInput, { target: { value: '40' } });
        fireEvent.blur(maxInput);

        expect(maxInput.value).toBe('90');
      });

      it('max value input is less than min value after editing', () => {
        const range = render(<Range min={0} max={100} />);
        const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;

        fireEvent.change(maxInput, { target: { value: '-150' } });
        fireEvent.blur(maxInput);
        expect(maxInput.value).toBe('100');
      });
    });
  });

  describe('Range with values', () => {
    it('renders Range correctly', () => {
      const range = render(<Range values={[10, 25, 60, 70, 90]} />);
      const maxInput = range.container.querySelector('#max-input') as HTMLInputElement;
      const minInput = range.container.querySelector('#min-input') as HTMLInputElement;

      expect(range).toBeTruthy();
      expect(minInput.value).toBe('10');
      expect(maxInput.value).toBe('90');

      expect(minInput.disabled).toBeTruthy();
      expect(maxInput.disabled).toBeTruthy();
    });
  });
});
