const matchingParentheses = {
  ')': '(',
  '}': '{',
  ']': '[',
};

function isValid(s: string): boolean {
  const stack: string[] = [];

  for (const char of s) {
    if (isOpeningParen(char)) {
      stack.push(char);
      continue;
    }

    const openingParen = stack.pop();
    const closingParen = matchingParentheses[char];
    if (openingParen !== closingParen) {
      return false;
    }
  }

  return stack.length === 0;
}

function isOpeningParen(char: string): boolean {
  return Object.values(matchingParentheses).includes(char);
}
