function canConstruct(ransomNote: string, magazine: string): boolean {
  let magazineMap = {};

  for (const char of magazine) {
    magazineMap[char] = char in magazineMap ? magazineMap[char] + 1 : 1;
  }

  for (const char of ransomNote) {
    if (!(char in magazineMap) || magazineMap[char] === 0) {
      return false;
    }

    magazineMap[char]--;
  }

  return true;
}
