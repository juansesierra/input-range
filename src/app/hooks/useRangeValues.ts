import { getValues } from '@/services/rangeService';
import { useEffect, useState } from 'react';

export const useRangeValues = () => {
  const [values, setValues] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getValues().then((response) => {
      setValues(response);
      setIsLoading(false);
    });
  }, []);

  return { values, isLoading };
};
