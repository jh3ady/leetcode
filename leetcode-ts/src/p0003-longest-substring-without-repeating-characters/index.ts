/**
 * [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — medium
 *
 * Given a string, return the length of the longest substring that contains
 * no repeated character.
 *
 * Complexity: O(n) time, O(min(n, σ)) space where σ is the alphabet size.
 */
export function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right] as string;
    while (seen.has(ch)) {
      seen.delete(s[left] as string);
      left++;
    }
    seen.add(ch);
    const windowLength = right - left + 1;
    if (windowLength > best) {
      best = windowLength;
    }
  }

  return best;
}
