function searchInsert(numbers: number[], target: number): number {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (numbers[middle] === target) {
      return middle;
    }

    if (numbers[middle] < target) {
      left = middle + 1;
    }

    if (numbers[middle] > target) {
      right = middle - 1;
    }
  }

  return left;
}
