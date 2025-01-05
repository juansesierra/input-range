'use client';

import React from 'react';
import { Range } from '@/components/Range';
import { useRangeValues } from '../hooks/useRangeValues';

const Exercise2Page = () => {
  const { values, isLoading } = useRangeValues();

  return <div className='p-10'>{isLoading ? <span>loading...</span> : <Range values={values} />}</div>;
};

export default Exercise2Page;
