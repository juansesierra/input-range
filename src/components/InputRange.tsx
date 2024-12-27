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
};

export const InputRange = ({ min, max, minValue, maxValue, onMinValueChange, onMaxValueChange }: InputRangeProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const onCurrentMinValueChange = (value: number) => {
    if (value < maxValue) {
      onMinValueChange(value);
    }
  };

  const onCurrentMaxValueChange = (value: number) => {
    if (value > minValue) {
      onMaxValueChange(value);
    }
  };

  return (
    <div className='bg-white w-full h-2 relative inline-flex items-center p-0' ref={sliderRef}>
      <Slider containerRef={sliderRef} max={max} min={min} value={minValue} onChange={onCurrentMinValueChange} />
      <div
        className='bg-sky-500 w-full h-2 absolute items-center inline-flex'
        style={{
          width: `${((maxValue - minValue) / (max - min)) * 100}%`,
          left: `${((minValue - min) / (max - min)) * 100}%`,
        }}
      />
      <Slider containerRef={sliderRef} max={max} min={min} value={maxValue} onChange={onCurrentMaxValueChange} />
    </div>
  );
};
