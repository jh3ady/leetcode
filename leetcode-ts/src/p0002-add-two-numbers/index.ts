/**
 * [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) — medium
 *
 * Two non-empty linked lists representing non-negative integers, with digits
 * stored in reverse order (the 1s digit first). Sum them and return the result
 * as a linked list in the same reverse order.
 *
 * Complexity: O(max(m, n)) time, O(max(m, n)) space.
 */

export type ListNode = {
  val: number;
  next: ListNode | null;
};

export function fromArray(digits: readonly number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = digits.length - 1; i >= 0; i--) {
    head = { val: digits[i] ?? 0, next: head };
  }
  return head;
}

export function toArray(head: ListNode | null): number[] {
  const out: number[] = [];
  let node = head;
  while (node !== null) {
    out.push(node.val);
    node = node.next;
  }
  return out;
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;
  let a = l1;
  let b = l2;
  let carry = 0;

  while (a !== null || b !== null || carry !== 0) {
    const sum = (a?.val ?? 0) + (b?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = { val: sum % 10, next: null };
    tail = tail.next;
    a = a?.next ?? null;
    b = b?.next ?? null;
  }

  return dummy.next;
}
