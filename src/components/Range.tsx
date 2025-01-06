'use client';
import React, { ChangeEvent, useState } from 'react';
import { InputRange } from './InputRange';

type RangeProps =
  | {
      min: number;
      max: number;
      values?: never;
    }
  | {
      min?: never;
      max?: never;
      values: number[];
    };

export const Range = (props: RangeProps) => {
  const { values } = props;
  const hasValues = Boolean(values && values.length > 0);

  const min = values ? values[0] : props.min;
  const max = values ? values[values.length - 1] : props.max;

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
    if (minValueInput >= maxValueInput) {
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
    if (maxValueInput <= minValueInput) {
      setMaxValueInput(maxValue);
      return;
    }
    if (maxValueInput > minValueInput) {
      setMaxValue(maxValueInput);
      return;
    }
  };

  return (
    <div className='flex flex-row gap-4 items-center'>
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
