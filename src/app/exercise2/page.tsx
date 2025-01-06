'use client';

import React from 'react';
import { Range } from '@/components/Range';
import { useRangeValues } from '../hooks/useRangeValues';

const Exercise2Page = () => {
  const { data } = useRangeValues();

  return <div className='p-10'>{data && data.length && <Range values={data} />}</div>;
};

export default Exercise2Page;
