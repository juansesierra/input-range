export const getMaxAndMin = async (): Promise<{ min: number; max: number }> => {
  const response = await fetch('http://demo7841693.mockable.io/range').then((res) => res.json());

  return response;
};

export const getValues = async (): Promise<{ values: number[] }> => {
  const response = await fetch('http://demo7841693.mockable.io/range/values').then((res) => res.json());
  return response;
};
