<?php

declare(strict_types=1);

namespace JH3ady\LeetCode\P0003LongestSubstringWithoutRepeatingCharacters;

/**
 * [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — medium.
 *
 * Given a string, return the length of the longest substring that contains
 * no repeated character.
 *
 * Complexity: O(n) time, O(min(n, σ)) space where σ is the alphabet size.
 */
final class Solution
{
    public function lengthOfLongestSubstring(string $s): int
    {
        /** @var array<string, true> $seen */
        $seen = [];
        $left = 0;
        $best = 0;
        $length = strlen($s);

        for ($right = 0; $right < $length; $right++) {
            $ch = $s[$right];
            while (isset($seen[$ch])) {
                unset($seen[$s[$left]]);
                $left++;
            }
            $seen[$ch] = true;
            $windowLength = $right - $left + 1;
            if ($windowLength > $best) {
                $best = $windowLength;
            }
        }

        return $best;
    }
}
