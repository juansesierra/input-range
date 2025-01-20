import { getValues } from '@/services/rangeService';
import { useEffect, useState } from 'react';

export const useRangeValues = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    getValues()
      .then((response) => {
        setData(response.values);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  return { data };
};
