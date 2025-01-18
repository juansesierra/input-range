import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { InputRange } from '@/components/InputRange';

describe('InputRange', () => {
  const mockOnMinValueChange = jest.fn();
  const mockOnMaxValueChange = jest.fn();

  beforeAll(() => {
    window.HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        bottom: 0,
        height: 20,
        left: 0,
        right: 0,
        top: 0,
        width: 100,
      }) as DOMRect;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Min and max values only', () => {
    it('renders input range with correct initial values', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      expect(sliders).toHaveLength(2);
    });

    it('handles min value change within bounds', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.mouseDown(sliders[0]);

      const mockMouseEvent = new MouseEvent('mousemove', {
        clientX: 40,
        bubbles: true,
      });

      window.dispatchEvent(mockMouseEvent);
      expect(mockOnMinValueChange).toHaveBeenCalled();
    });

    it('prevents min value from exceeding max value', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.mouseDown(sliders[0]);

      const mockMouseEvent = new MouseEvent('mousemove', {
        clientX: 90,
        bubbles: true,
      });

      window.dispatchEvent(mockMouseEvent);
      expect(mockOnMinValueChange).not.toHaveBeenCalled();
    });

    it('prevents max value from being less than min value', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.mouseDown(sliders[1]);

      const mockMouseEvent = new MouseEvent('mousemove', {
        clientX: 20,
        bubbles: true,
      });

      window.dispatchEvent(mockMouseEvent);
      expect(mockOnMaxValueChange).not.toHaveBeenCalled();
    });

    it('handles ArrowRight keyboard events ', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });
      expect(mockOnMinValueChange).toHaveBeenCalled();
    });

    it('handles ArrowLeft keyboard events ', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });
      expect(mockOnMaxValueChange).toHaveBeenCalled();
    });

    it('ignores irrelevant keyboard events', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.keyDown(sliders[0], { key: 'ArrowUp' });
      expect(mockOnMinValueChange).not.toHaveBeenCalled();
      expect(mockOnMaxValueChange).not.toHaveBeenCalled();
    });
  });

  describe('Min, max, and array values', () => {
    it('changes to closest value when values array is provided', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
          values={[10, 20, 30, 40, 50, 60, 70, 80]}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.mouseDown(sliders[0]);

      const mockMouseEvent = new MouseEvent('mousemove', {
        clientX: 35,
        bubbles: true,
      });

      window.dispatchEvent(mockMouseEvent);
      expect(mockOnMinValueChange).toHaveBeenCalled();
    });

    it('handles keyboard navigation with values array', () => {
      render(
        <InputRange
          min={0}
          max={100}
          minValue={30}
          maxValue={80}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
          values={[10, 20, 30, 40, 50, 60, 70, 80]}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });
      expect(mockOnMinValueChange).toHaveBeenCalled();

      fireEvent.keyDown(sliders[0], { key: 'ArrowLeft' });
      expect(mockOnMinValueChange).toHaveBeenCalled();
    });

    it('works correctly with decimal values', () => {
      const values = [0, 10.5, 20.7, 30.2, 40.8, 50.3, 100];
      render(
        <InputRange
          min={0}
          max={100}
          minValue={20.7}
          maxValue={40.8}
          values={values}
          onMinValueChange={mockOnMinValueChange}
          onMaxValueChange={mockOnMaxValueChange}
        />,
      );

      const sliders = screen.getAllByTestId('slider-value');
      fireEvent.mouseDown(sliders[0]);

      const mockMouseEvent = new MouseEvent('mousemove', {
        clientX: 35,
        bubbles: true,
      });

      window.dispatchEvent(mockMouseEvent);
      expect(mockOnMinValueChange).toHaveBeenCalled();
    });
  });
});
