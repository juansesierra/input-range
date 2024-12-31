'use client';
import React, { ChangeEvent, useState } from 'react';
import { InputRange } from './InputRange';

type RangeProps = {
  min: number;
  max: number;
  values?: number[];
};

export const Range = ({ min, max, values }: RangeProps) => {
  const hasValues = values && values.length > 0;

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

  const onMinBlur = () => {
    if (minValueInput < min) {
      onMinRangeChange(min);
      return;
    }
    if (minValueInput > maxValueInput) {
      setMinValueInput(minValue);
      return;
    }
    if (minValueInput < maxValueInput) {
      setMinValue(minValueInput);
      return;
    }
  };

  const onMaxBlur = () => {
    if (maxValueInput > max) {
      onMaxRangeChange(max);
      return;
    }
    if (maxValueInput < minValueInput) {
      setMaxValueInput(maxValue);
      return;
    }
    if (maxValueInput > minValueInput) {
      setMaxValue(maxValueInput);
      return;
    }
  };

  return (
    <div className='flex flex-row gap-4 items-center p-10'>
      <input
        id='min-input'
        className='bg-transparent w-10 text-end'
        disabled={hasValues}
        type='number'
        max={maxValue}
        value={minValueInput}
        onChange={onMinValueChange}
        onBlur={onMinBlur}
      />
      <InputRange
        min={min}
        max={max}
        minValue={minValue}
        maxValue={maxValue}
        onMinValueChange={onMinRangeChange}
        onMaxValueChange={onMaxRangeChange}
        values={values}
      />
      <input
        id='max-input'
        className='bg-transparent w-10'
        disabled={hasValues}
        type='number'
        min={minValue}
        value={maxValueInput}
        onChange={onMaxValueChange}
        onBlur={onMaxBlur}
      />
    </div>
  );
};
