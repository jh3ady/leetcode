import { describe, expect, it } from 'vitest';
import { twoSum } from './index.ts';

describe('p0001 — two sum', () => {
  it('finds a pair at the start of the array', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('finds a pair in the middle of the array', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it('handles duplicate values', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it('handles negative numbers', () => {
    expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
  });

  it('returns null when no solution exists', () => {
    expect(twoSum([1, 2, 3], 7)).toBeNull();
  });

  it('returns null on an empty input', () => {
    expect(twoSum([], 0)).toBeNull();
  });
});
