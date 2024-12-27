'use client';
import React, { ChangeEvent, useState } from 'react';
import { InputRange } from './InputRange';

type RangeProps = {
  min: number;
  max: number;
};

export const Range = ({ min, max }: RangeProps) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const [minValueInput, setMinValueInput] = useState(minValue);
  const [maxValueInput, setMaxValueInput] = useState(maxValue);

  const onMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinValueInput(Number(event.target.value));
  };

  const onMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxValueInput(Number(event.target.value));
  };

  const onMinRangeChange = (value: number) => {
    setMinValue(value);
    setMinValueInput(value);
  };

  const onMaxRangeChange = (value: number) => {
    setMaxValue(value);
    setMaxValueInput(value);
  };

  const onBlur = () => {
    if (minValueInput < min) {
      onMinRangeChange(min);
      return;
    }
    if (minValueInput > maxValueInput) {
      setMinValueInput(minValue);
      return;
    }
    if (maxValueInput > max) {
      onMaxRangeChange(max);
      return;
    }
    if (maxValueInput < minValueInput) {
      setMaxValueInput(maxValue);
      return;
    }
    if (minValueInput < maxValueInput && maxValueInput > minValueInput) {
      setMinValue(minValueInput);
      setMaxValue(maxValueInput);
      return;
    }
  };

  return (
    <div className='flex flex-row gap-4 items-center p-10'>
      <input
        className='bg-transparent w-10 text-end'
        type='number'
        max={maxValue}
        value={minValueInput}
        onChange={onMinValueChange}
        onBlur={onBlur}
      />
      <InputRange
        min={min}
        max={max}
        minValue={minValue}
        maxValue={maxValue}
        onMinValueChange={onMinRangeChange}
        onMaxValueChange={onMaxRangeChange}
      />
      <input
        className='bg-transparent w-10'
        type='number'
        min={minValue}
        value={maxValueInput}
        onChange={onMaxValueChange}
        onBlur={onBlur}
      />
    </div>
  );
};
