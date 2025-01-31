'use client';
import React, { useRef } from 'react';
import { Slider } from './Slider';

type InputRangeProps = {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinValueChange: (value: number) => void;
  onMaxValueChange: (value: number) => void;
  values?: number[];
};

const getClosestValue = (value: number, values: number[]) => {
  const closestValue = values.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
  return closestValue;
};

export const InputRange = ({
  min,
  max,
  minValue,
  maxValue,
  onMinValueChange,
  onMaxValueChange,
  values,
}: InputRangeProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const hasValues = values && values.length > 0;

  const onCurrentMinValueChange = (value: number) => {
    const valueToChange = hasValues ? getClosestValue(value, values) : value;

    if (valueToChange < maxValue && valueToChange >= min) {
      onMinValueChange(valueToChange);
    }
  };

  const onCurrentMaxValueChange = (value: number) => {
    const valueToChange = hasValues ? getClosestValue(value, values) : value;

    if (valueToChange > minValue && valueToChange <= max) {
      onMaxValueChange(valueToChange);
    }
  };

  const onMinKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown(event, minValue, onCurrentMinValueChange);
  };

  const onMaxKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown(event, maxValue, onCurrentMaxValueChange);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>, value: number, onChange: (value: number) => void) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      let selectedValue = value;
      if (event.key === 'ArrowLeft') {
        selectedValue = hasValues ? values[values.indexOf(value) - 1] : Math.max(value - 1, min);
      } else if (event.key === 'ArrowRight') {
        selectedValue = hasValues ? values[values.indexOf(value) + 1] : Math.max(value + 1, min);
      }
      onChange(selectedValue);
    }
  };

  return (
    <div id='slider' className='bg-gray-300 w-full h-2 relative inline-flex items-center p-0' ref={sliderRef}>
      <Slider
        containerRef={sliderRef}
        max={max}
        min={min}
        value={minValue}
        onChange={onCurrentMinValueChange}
        onKeyDown={onMinKeyDown}
      />
      <div
        className='bg-sky-500 w-full h-2 absolute'
        style={{
          width: `${((maxValue - minValue) / (max - min)) * 100}%`,
          left: `${((minValue - min) / (max - min)) * 100}%`,
        }}
      />
      <Slider
        containerRef={sliderRef}
        max={max}
        min={min}
        value={maxValue}
        onChange={onCurrentMaxValueChange}
        onKeyDown={onMaxKeyDown}
      />
    </div>
  );
};
