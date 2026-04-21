<?php

declare(strict_types=1);

namespace JH3ady\LeetCode\P0002AddTwoNumbers;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

#[CoversClass(Solution::class)]
#[CoversClass(ListNode::class)]
final class SolutionTest extends TestCase
{
    private Solution $solver;

    protected function setUp(): void
    {
        $this->solver = new Solution();
    }

    #[Test]
    public function itAddsTwoNumbersWithoutPropagatingACarry(): void
    {
        $result = $this->solver->solve(
            Solution::fromArray([2, 4, 3]),
            Solution::fromArray([5, 6, 4]),
        );

        self::assertSame([7, 0, 8], Solution::toArray($result));
    }

    #[Test]
    public function itReturnsASingleZeroWhenBothInputsEncodeZero(): void
    {
        $result = $this->solver->solve(
            Solution::fromArray([0]),
            Solution::fromArray([0]),
        );

        self::assertSame([0], Solution::toArray($result));
    }

    #[Test]
    public function itPropagatesACarryAcrossEveryDigit(): void
    {
        $result = $this->solver->solve(
            Solution::fromArray([9, 9, 9, 9, 9, 9, 9]),
            Solution::fromArray([9, 9, 9, 9]),
        );

        self::assertSame([8, 9, 9, 9, 0, 0, 0, 1], Solution::toArray($result));
    }

    #[Test]
    public function itHandlesInputsOfDifferentLengths(): void
    {
        $result = $this->solver->solve(
            Solution::fromArray([1]),
            Solution::fromArray([9, 9, 9, 9]),
        );

        self::assertSame([0, 0, 0, 0, 1], Solution::toArray($result));
    }

    #[Test]
    public function itAppendsAFinalCarryNodeWhenTheSumGrowsByOneDigit(): void
    {
        $result = $this->solver->solve(
            Solution::fromArray([5]),
            Solution::fromArray([5]),
        );

        self::assertSame([0, 1], Solution::toArray($result));
    }
}
