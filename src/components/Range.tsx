'use client';
import React, { useState } from 'react';
import { InputRange } from './InputRange';

type RangeProps = {
  min: number;
  max: number;
};

export const Range = ({ min, max }: RangeProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className='p-10'>
      <div className='flex flex-row gap-2 items-center'>
        <span>{min}</span>
        <InputRange min={min} max={max} />
        <span>{max}</span>
      </div>
    </div>
  );
};
