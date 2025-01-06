export const getMaxAndMin = async (): Promise<{ min: number; max: number }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/range`).then((res) => res.json());

  return response;
};

export const getValues = async (): Promise<{ values: number[] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/range/values`).then((res) => res.json());
  return response;
};
