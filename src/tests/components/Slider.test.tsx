import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Slider } from '@/components/Slider';

describe('Slider', () => {
  const mockOnChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const containerRef = { current: document.createElement('div') };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders slider with correct initial position', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    expect(sliderValue).toBeInTheDocument();
  });

  it('handles mouse drag events', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.mouseDown(sliderValue);

    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      bubbles: true,
    });

    window.dispatchEvent(mockMouseEvent);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('handles touch events', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.touchStart(sliderValue);

    const touchEvent = new TouchEvent('touchmove', {
      touches: [{ clientX: 100 }] as unknown as Touch[],
      bubbles: true,
    });

    window.dispatchEvent(touchEvent);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('handles ArrowRight keyboard events', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.keyDown(sliderValue, { key: 'ArrowRight' });

    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it('handles ArrowLeft keyboard event', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.keyDown(sliderValue, { key: 'ArrowLeft' });
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object));
  });

  it('cleans up event listeners on unmount', () => {
    const sliderComponent = render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.mouseDown(sliderValue);

    sliderComponent.unmount();

    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      bubbles: true,
    });

    window.dispatchEvent(mockMouseEvent);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('handles mouse up event', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.mouseDown(sliderValue);
    fireEvent.mouseUp(sliderValue);

    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      bubbles: true,
    });

    window.dispatchEvent(mockMouseEvent);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('handles touch end event', () => {
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        containerRef={containerRef}
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
      />,
    );
    const sliderValue = screen.getByTestId('slider-value');
    fireEvent.touchStart(sliderValue);
    fireEvent.touchEnd(sliderValue);

    const touchEvent = new TouchEvent('touchmove', {
      touches: [{ clientX: 100 }] as unknown as Touch[],
      bubbles: true,
    });

    window.dispatchEvent(touchEvent);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
