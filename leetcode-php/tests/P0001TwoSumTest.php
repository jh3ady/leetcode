<?php

declare(strict_types=1);

namespace JH3ady\LeetCode\Tests;

use JH3ady\LeetCode\P0001TwoSum;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

#[CoversClass(P0001TwoSum::class)]
final class P0001TwoSumTest extends TestCase
{
    private P0001TwoSum $solver;

    protected function setUp(): void
    {
        $this->solver = new P0001TwoSum();
    }

    #[Test]
    public function itFindsAPairAtTheStartOfTheArray(): void
    {
        self::assertSame([0, 1], $this->solver->solve([2, 7, 11, 15], 9));
    }

    #[Test]
    public function itFindsAPairInTheMiddleOfTheArray(): void
    {
        self::assertSame([1, 2], $this->solver->solve([3, 2, 4], 6));
    }

    #[Test]
    public function itHandlesDuplicateValues(): void
    {
        self::assertSame([0, 1], $this->solver->solve([3, 3], 6));
    }

    #[Test]
    public function itHandlesNegativeNumbers(): void
    {
        self::assertSame([0, 2], $this->solver->solve([-3, 4, 3, 90], 0));
    }

    #[Test]
    public function itReturnsNullWhenNoSolutionExists(): void
    {
        self::assertNull($this->solver->solve([1, 2, 3], 7));
    }

    #[Test]
    public function itReturnsNullOnAnEmptyInput(): void
    {
        self::assertNull($this->solver->solve([], 0));
    }
}
