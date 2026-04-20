<?php

declare(strict_types=1);

namespace JH3ady\LeetCode;

/**
 * [1. Two Sum](https://leetcode.com/problems/two-sum/) — easy.
 *
 * Given an array `nums` and an integer `target`, return the indices of the two
 * numbers that add up to `target`. Each input has exactly one solution; a
 * number cannot be used twice.
 *
 * Complexity: O(n) time, O(n) space.
 */
final class P0001TwoSum
{
    /**
     * @param list<int> $nums
     * @return array{0: int, 1: int}|null
     */
    public function solve(array $nums, int $target): ?array
    {
        $seen = [];

        foreach ($nums as $i => $current) {
            $complement = $target - $current;
            if (isset($seen[$complement])) {
                return [$seen[$complement], $i];
            }
            $seen[$current] = $i;
        }

        return null;
    }
}
