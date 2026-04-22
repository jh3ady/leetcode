import { describe, expect, it } from 'vitest';
import { lengthOfLongestSubstring } from './index.ts';

describe('p0003 — longest substring without repeating characters', () => {
  it('returns zero for the empty string', () => {
    expect(lengthOfLongestSubstring('')).toBe(0);
  });

  it('returns one for a single character', () => {
    expect(lengthOfLongestSubstring('a')).toBe(1);
  });

  it('returns one when every character is the same', () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  it('returns the full length when all characters are unique', () => {
    expect(lengthOfLongestSubstring('abcdef')).toBe(6);
  });

  it('finds the longest prefix window before a repeat', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  it('slides the window past the earlier duplicate', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });

  it('restarts the window after an interior repeat', () => {
    expect(lengthOfLongestSubstring('dvdf')).toBe(3);
  });

  it('handles spaces and symbols as regular characters', () => {
    expect(lengthOfLongestSubstring(' ab cd ef')).toBe(5);
  });
});
