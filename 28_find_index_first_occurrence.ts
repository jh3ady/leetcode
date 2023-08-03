function strStr(haystack: string, needle: string): number {
  if (needle.length > haystack.length) {
    return -1;
  }

  if (haystack === needle) {
    return 0;
  }

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] !== needle[0]) {
      continue;
    }

    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }

      if (j === needle.length - 1) {
        return i;
      }
    }
  }

  return -1;
}
