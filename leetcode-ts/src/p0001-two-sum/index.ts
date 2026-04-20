/**
 * [1. Two Sum](https://leetcode.com/problems/two-sum/) — easy
 *
 * Given an array `nums` and a `target`, return the indices of the two numbers
 * that add up to `target`. Each input has exactly one solution; a number
 * cannot be used twice.
 *
 * Complexity: O(n) time, O(n) space.
 */
export function twoSum(nums: readonly number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();
  for (const [i, current] of nums.entries()) {
    const complement = target - current;
    const j = seen.get(complement);
    if (j !== undefined) {
      return [j, i];
    }
    seen.set(current, i);
  }
  return null;
}
