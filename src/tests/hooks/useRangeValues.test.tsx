import { renderHook, waitFor } from '@testing-library/react';
import { getValues } from '../../services/rangeService';
import { useRangeValues } from '@/app/hooks/useRangeValues';

jest.mock('../../services/rangeService');

describe('useRangeValues', () => {
  const mockRangeData = { values: [10, 20, 30, 40, 50] };

  beforeEach(() => {
    (getValues as jest.Mock).mockResolvedValue(mockRangeData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches range data on mount', async () => {
    const { result } = renderHook(() => useRangeValues());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockRangeData.values);
    });
    expect(getValues).toHaveBeenCalledTimes(1);
  });

  it('handles successful data fetch', async () => {
    const customRangeData = { values: [1.99, 20.5, 30, 40, 50, 60.34] };
    (getValues as jest.Mock).mockResolvedValueOnce(customRangeData);

    const { result } = renderHook(() => useRangeValues());

    await waitFor(() => {
      expect(result.current.data).toEqual(customRangeData.values);
    });
  });

  it('handles API error', async () => {
    (getValues as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useRangeValues());

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });
});
