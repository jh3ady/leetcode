//! [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — `medium`
//!
//! Given a string, return the length of the longest substring that contains
//! no repeated character.

use std::collections::HashSet;

/// Length of the longest substring of `s` without repeating characters.
///
/// Complexity: `O(n)` time, `O(min(n, σ))` extra memory where σ is the
/// alphabet size.
#[must_use]
#[allow(clippy::cast_possible_truncation, clippy::cast_possible_wrap)]
pub fn length_of_longest_substring(s: &str) -> i32 {
    let bytes = s.as_bytes();
    let mut seen: HashSet<u8> = HashSet::new();
    let mut left = 0usize;
    let mut best = 0usize;

    for (right, &ch) in bytes.iter().enumerate() {
        while seen.contains(&ch) {
            seen.remove(&bytes[left]);
            left += 1;
        }
        seen.insert(ch);
        let window_length = right - left + 1;
        if window_length > best {
            best = window_length;
        }
    }

    best as i32
}

#[cfg(test)]
mod tests {
    use super::length_of_longest_substring;

    #[test]
    fn returns_zero_for_the_empty_string() {
        assert_eq!(length_of_longest_substring(""), 0);
    }

    #[test]
    fn returns_one_for_a_single_character() {
        assert_eq!(length_of_longest_substring("a"), 1);
    }

    #[test]
    fn returns_one_when_every_character_is_the_same() {
        assert_eq!(length_of_longest_substring("bbbbb"), 1);
    }

    #[test]
    fn returns_the_full_length_when_all_characters_are_unique() {
        assert_eq!(length_of_longest_substring("abcdef"), 6);
    }

    #[test]
    fn finds_the_longest_prefix_window_before_a_repeat() {
        assert_eq!(length_of_longest_substring("abcabcbb"), 3);
    }

    #[test]
    fn slides_the_window_past_the_earlier_duplicate() {
        assert_eq!(length_of_longest_substring("pwwkew"), 3);
    }

    #[test]
    fn restarts_the_window_after_an_interior_repeat() {
        assert_eq!(length_of_longest_substring("dvdf"), 3);
    }

    #[test]
    fn handles_spaces_and_symbols_as_regular_characters() {
        assert_eq!(length_of_longest_substring(" ab cd ef"), 5);
    }
}
