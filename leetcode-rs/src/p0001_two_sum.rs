//! [1. Two Sum](https://leetcode.com/problems/two-sum/) — `easy`
//!
//! Given an array of integers `nums` and an integer `target`, return the indices
//! of the two numbers such that they add up to `target`. You may assume that
//! each input would have exactly one solution, and you may not use the same
//! element twice.

use std::collections::HashMap;

/// Returns the indices `[i, j]` such that `nums[i] + nums[j] == target`.
///
/// Complexity: `O(n)` time, `O(n)` extra memory.
pub fn two_sum(nums: &[i32], target: i32) -> Option<[usize; 2]> {
    let mut seen: HashMap<i32, usize> = HashMap::with_capacity(nums.len());
    for (i, &n) in nums.iter().enumerate() {
        if let Some(&j) = seen.get(&(target - n)) {
            return Some([j, i]);
        }
        seen.insert(n, i);
    }
    None
}

#[cfg(test)]
mod tests {
    use super::two_sum;

    #[test]
    fn finds_pair_at_the_start() {
        assert_eq!(two_sum(&[2, 7, 11, 15], 9), Some([0, 1]));
    }

    #[test]
    fn finds_pair_in_the_middle() {
        assert_eq!(two_sum(&[3, 2, 4], 6), Some([1, 2]));
    }

    #[test]
    fn handles_duplicate_values() {
        assert_eq!(two_sum(&[3, 3], 6), Some([0, 1]));
    }

    #[test]
    fn handles_negative_numbers() {
        assert_eq!(two_sum(&[-3, 4, 3, 90], 0), Some([0, 2]));
    }

    #[test]
    fn returns_none_when_no_solution() {
        assert_eq!(two_sum(&[1, 2, 3], 7), None);
    }

    #[test]
    fn returns_none_on_empty_input() {
        assert_eq!(two_sum(&[], 0), None);
    }
}
