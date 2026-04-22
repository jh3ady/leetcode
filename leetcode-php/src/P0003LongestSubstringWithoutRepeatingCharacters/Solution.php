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
        /** @var array<string, int> $lastIndex */
        $lastIndex = [];
        $left = 0;
        $best = 0;
        $length = strlen($s);

        for ($right = 0; $right < $length; $right++) {
            $ch = $s[$right];
            if (isset($lastIndex[$ch]) && $lastIndex[$ch] >= $left) {
                $left = $lastIndex[$ch] + 1;
            }
            $lastIndex[$ch] = $right;
            $windowLength = $right - $left + 1;
            if ($windowLength > $best) {
                $best = $windowLength;
            }
        }

        return $best;
    }
}
