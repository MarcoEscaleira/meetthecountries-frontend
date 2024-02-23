export const plurarize = (word: string, value: number) => {
  return value > 1 ? `${word}s` : word;
};
