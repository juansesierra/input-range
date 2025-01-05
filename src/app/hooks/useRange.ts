'use client';
import { getMaxAndMin } from '@/services/rangeService';
import { useEffect, useState } from 'react';

export const useRange = () => {
  const [data, setData] = useState<{ min: number; max: number }>();

  useEffect(() => {
    getMaxAndMin().then((response) => {
      setData(response);
    });
  }, []);

  return { data };
};
