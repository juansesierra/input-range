import { getMaxAndMin, getValues } from '../../services/rangeService';
import fetchMock from 'jest-fetch-mock';

describe('getMaxAndMin', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and return min and max values', async () => {
    const mockResponse = { min: 0, max: 90 };
    fetchMock.mockResponseOnce(() => Promise.resolve(JSON.stringify(mockResponse)));

    const result = await getMaxAndMin();

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/range`);
  });

  it('should handle API error response', async () => {
    fetchMock.mockRejectOnce(new Error('API Error'));

    await expect(getMaxAndMin()).rejects.toThrow('API Error');
  });

  it('should handle invalid JSON response', async () => {
    fetchMock.mockResponseOnce('invalid json');

    await expect(getMaxAndMin()).rejects.toThrow();
  });

  it('should handle empty response', async () => {
    fetchMock.mockResponseOnce('{}');

    const result = await getMaxAndMin();
    expect(result).toEqual({});
  });
});

describe('getValues', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and return array of values', async () => {
    const mockResponse = { values: [10, 20, 30, 40, 50] };
    fetchMock.mockResponseOnce(() => Promise.resolve(JSON.stringify(mockResponse)));

    const result = await getValues();

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/range/values`);
  });

  it('should handle empty array response', async () => {
    const mockResponse = { values: [] };
    fetchMock.mockResponseOnce(() => Promise.resolve(JSON.stringify(mockResponse)));

    const result = await getValues();
    expect(result).toEqual(mockResponse);
  });

  it('should handle invalid JSON response', async () => {
    fetchMock.mockResponseOnce('invalid json');

    await expect(getValues()).rejects.toThrow();
  });

  it('should handle API error response', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch values'));

    await expect(getValues()).rejects.toThrow('Failed to fetch values');
  });
});
