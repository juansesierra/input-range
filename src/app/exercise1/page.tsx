'use client';
import React from 'react';
import { Range } from '@/components/Range';
import { useRange } from '../hooks/useRange';

const Exercise1Page = () => {
  const { data } = useRange();

  return <div className='p-10'>{data && <Range min={data.min} max={data.max} />}</div>;
};

export default Exercise1Page;
