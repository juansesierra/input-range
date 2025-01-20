import { renderHook, waitFor } from '@testing-library/react';
import { useRange } from '@/app/hooks/useRange';
import { getMaxAndMin } from '../../services/rangeService';

jest.mock('../../services/rangeService');

describe('useRange', () => {
  const mockRangeData = { min: 0, max: 100 };

  beforeEach(() => {
    (getMaxAndMin as jest.Mock).mockResolvedValue(mockRangeData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches range data on mount', async () => {
    const { result } = renderHook(() => useRange());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockRangeData);
    });
    expect(getMaxAndMin).toHaveBeenCalledTimes(1);
  });

  it('handles successful data fetch', async () => {
    const customRangeData = { min: 10, max: 200 };
    (getMaxAndMin as jest.Mock).mockResolvedValueOnce(customRangeData);

    const { result } = renderHook(() => useRange());

    await waitFor(() => {
      expect(result.current.data).toEqual(customRangeData);
    });
  });

  it('handles API error', async () => {
    (getMaxAndMin as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useRange());

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
    });
  });
});
