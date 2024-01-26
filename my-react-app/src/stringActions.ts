export const containsSubstringIgnoreCase = (
  mainString: string,
  subString: string
): boolean => {
  const mainToLower = mainString.toLowerCase();
  const subToLower = subString.toLowerCase();

  return mainToLower.includes(subToLower);
};
