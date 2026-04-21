<?php

declare(strict_types=1);

namespace JH3ady\LeetCode\P0002AddTwoNumbers;

/**
 * [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) — medium.
 *
 * Two non-empty linked lists representing non-negative integers, with digits
 * stored in reverse order (the 1s digit first). Sum them and return the result
 * as a linked list in the same reverse order.
 *
 * Complexity: O(max(m, n)) time, O(max(m, n)) space.
 */
final class Solution
{
    public function solve(?ListNode $l1, ?ListNode $l2): ?ListNode
    {
        $dummy = new ListNode();
        $tail = $dummy;
        $a = $l1;
        $b = $l2;
        $carry = 0;

        while ($a !== null || $b !== null || $carry !== 0) {
            $valA = $a !== null ? $a->val : 0;
            $valB = $b !== null ? $b->val : 0;
            $sum = $valA + $valB + $carry;
            $carry = intdiv($sum, 10);
            $tail->next = new ListNode($sum % 10);
            $tail = $tail->next;
            $a = $a !== null ? $a->next : null;
            $b = $b !== null ? $b->next : null;
        }

        return $dummy->next;
    }

    /**
     * @param list<int> $digits
     */
    public static function fromArray(array $digits): ?ListNode
    {
        $head = null;
        for ($i = count($digits) - 1; $i >= 0; $i--) {
            $head = new ListNode($digits[$i], $head);
        }

        return $head;
    }

    /**
     * @return list<int>
     */
    public static function toArray(?ListNode $head): array
    {
        $out = [];
        $node = $head;
        while ($node !== null) {
            $out[] = $node->val;
            $node = $node->next;
        }

        return $out;
    }
}
