<?php

declare(strict_types=1);

namespace JH3ady\LeetCode\P0003LongestSubstringWithoutRepeatingCharacters;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

#[CoversClass(Solution::class)]
final class SolutionTest extends TestCase
{
    private Solution $solver;

    protected function setUp(): void
    {
        $this->solver = new Solution();
    }

    #[Test]
    public function itReturnsZeroForTheEmptyString(): void
    {
        self::assertSame(0, $this->solver->lengthOfLongestSubstring(''));
    }

    #[Test]
    public function itReturnsOneForASingleCharacter(): void
    {
        self::assertSame(1, $this->solver->lengthOfLongestSubstring('a'));
    }

    #[Test]
    public function itReturnsOneWhenEveryCharacterIsTheSame(): void
    {
        self::assertSame(1, $this->solver->lengthOfLongestSubstring('bbbbb'));
    }

    #[Test]
    public function itReturnsTheFullLengthWhenAllCharactersAreUnique(): void
    {
        self::assertSame(6, $this->solver->lengthOfLongestSubstring('abcdef'));
    }

    #[Test]
    public function itFindsTheLongestPrefixWindowBeforeARepeat(): void
    {
        self::assertSame(3, $this->solver->lengthOfLongestSubstring('abcabcbb'));
    }

    #[Test]
    public function itSlidesTheWindowPastTheEarlierDuplicate(): void
    {
        self::assertSame(3, $this->solver->lengthOfLongestSubstring('pwwkew'));
    }

    #[Test]
    public function itRestartsTheWindowAfterAnInteriorRepeat(): void
    {
        self::assertSame(3, $this->solver->lengthOfLongestSubstring('dvdf'));
    }

    #[Test]
    public function itHandlesSpacesAndSymbolsAsRegularCharacters(): void
    {
        self::assertSame(5, $this->solver->lengthOfLongestSubstring(' ab cd ef'));
    }
}
