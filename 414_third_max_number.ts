function thirdMax(numbers: number[]): number {
  const nonDuplicatedNumbers = [...new Set(numbers)];
  
  nonDuplicatedNumbers.sort((a, b) => b - a);

  if (nonDuplicatedNumbers.length < 3) {
    return nonDuplicatedNumbers[0];
  }

  return nonDuplicatedNumbers[2];
};
