/**
 * [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — medium
 *
 * Given a string, return the length of the longest substring that contains
 * no repeated character.
 *
 * Complexity: O(n) time, O(min(n, σ)) space where σ is the alphabet size.
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastIndex = new Map<string, number>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right] as string;
    const previous = lastIndex.get(ch);
    if (previous !== undefined && previous >= left) {
      left = previous + 1;
    }
    lastIndex.set(ch, right);
    const windowLength = right - left + 1;
    if (windowLength > best) {
      best = windowLength;
    }
  }

  return best;
}
