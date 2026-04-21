//! [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) — `medium`
//!
//! Two non-empty linked lists representing non-negative integers, with digits
//! stored in reverse order (the 1s digit first). Sum them and return the
//! result as a linked list in the same reverse order.

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[must_use]
    pub const fn new(val: i32) -> Self {
        Self { val, next: None }
    }
}

/// Builds a linked list from a slice of digits (first element becomes the head).
#[must_use]
pub fn from_slice(digits: &[i32]) -> Option<Box<ListNode>> {
    let mut head: Option<Box<ListNode>> = None;
    for &d in digits.iter().rev() {
        head = Some(Box::new(ListNode { val: d, next: head }));
    }
    head
}

/// Collects the values of a linked list into a `Vec` in head-to-tail order.
#[must_use]
pub fn to_vec(head: &Option<Box<ListNode>>) -> Vec<i32> {
    let mut out = Vec::new();
    let mut node = head.as_deref();
    while let Some(n) = node {
        out.push(n.val);
        node = n.next.as_deref();
    }
    out
}

/// Adds two numbers represented as reverse-ordered digit lists.
///
/// Complexity: `O(max(m, n))` time, `O(max(m, n))` extra memory.
#[must_use]
pub fn add_two_numbers(
    l1: Option<Box<ListNode>>,
    l2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    let mut a = l1;
    let mut b = l2;
    let mut carry = 0i32;
    let mut digits: Vec<i32> = Vec::new();

    while a.is_some() || b.is_some() || carry != 0 {
        let va = a.as_ref().map_or(0, |n| n.val);
        let vb = b.as_ref().map_or(0, |n| n.val);
        let sum = va + vb + carry;
        carry = sum / 10;
        digits.push(sum % 10);
        a = a.and_then(|n| n.next);
        b = b.and_then(|n| n.next);
    }

    let mut head: Option<Box<ListNode>> = None;
    for d in digits.into_iter().rev() {
        head = Some(Box::new(ListNode { val: d, next: head }));
    }
    head
}

#[cfg(test)]
mod tests {
    use super::{add_two_numbers, from_slice, to_vec};

    #[test]
    fn adds_two_numbers_without_propagating_a_carry() {
        let out = add_two_numbers(from_slice(&[2, 4, 3]), from_slice(&[5, 6, 4]));
        assert_eq!(to_vec(&out), vec![7, 0, 8]);
    }

    #[test]
    fn returns_a_single_zero_when_both_inputs_encode_zero() {
        let out = add_two_numbers(from_slice(&[0]), from_slice(&[0]));
        assert_eq!(to_vec(&out), vec![0]);
    }

    #[test]
    fn propagates_a_carry_across_every_digit() {
        let out = add_two_numbers(
            from_slice(&[9, 9, 9, 9, 9, 9, 9]),
            from_slice(&[9, 9, 9, 9]),
        );
        assert_eq!(to_vec(&out), vec![8, 9, 9, 9, 0, 0, 0, 1]);
    }

    #[test]
    fn handles_inputs_of_different_lengths() {
        let out = add_two_numbers(from_slice(&[1]), from_slice(&[9, 9, 9, 9]));
        assert_eq!(to_vec(&out), vec![0, 0, 0, 0, 1]);
    }

    #[test]
    fn appends_a_final_carry_node_when_the_sum_grows_by_one_digit() {
        let out = add_two_numbers(from_slice(&[5]), from_slice(&[5]));
        assert_eq!(to_vec(&out), vec![0, 1]);
    }
}
