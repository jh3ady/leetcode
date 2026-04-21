<?php

declare(strict_types=1);

namespace JH3ady\LeetCode\P0002AddTwoNumbers;

/**
 * Singly linked list node used by [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/).
 */
final class ListNode
{
    public function __construct(
        public int $val = 0,
        public ?ListNode $next = null,
    ) {}
}
