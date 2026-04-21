import { describe, expect, it } from 'vitest';
import { addTwoNumbers, fromArray, toArray } from './index.ts';

describe('p0002 — add two numbers', () => {
  it('adds two numbers without propagating a carry', () => {
    expect(toArray(addTwoNumbers(fromArray([2, 4, 3]), fromArray([5, 6, 4])))).toEqual([7, 0, 8]);
  });

  it('returns a single zero when both inputs encode zero', () => {
    expect(toArray(addTwoNumbers(fromArray([0]), fromArray([0])))).toEqual([0]);
  });

  it('propagates a carry across every digit', () => {
    expect(
      toArray(addTwoNumbers(fromArray([9, 9, 9, 9, 9, 9, 9]), fromArray([9, 9, 9, 9]))),
    ).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
  });

  it('handles inputs of different lengths', () => {
    expect(toArray(addTwoNumbers(fromArray([1]), fromArray([9, 9, 9, 9])))).toEqual([
      0, 0, 0, 0, 1,
    ]);
  });

  it('appends a final carry node when the sum grows by one digit', () => {
    expect(toArray(addTwoNumbers(fromArray([5]), fromArray([5])))).toEqual([0, 1]);
  });
});
