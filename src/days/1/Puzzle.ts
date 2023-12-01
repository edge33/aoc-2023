const first = (input: string) => {
  return input.split('\n').reduce((acc, next) => {
    const digits = Array.from(next.matchAll(/\d/g));
    return acc + +`${digits[0]}${digits[digits.length - 1]}`;
  }, 0);
};

const expectedFirstSolution = 54239;

const second = (input: string) => {
  return input.split('\n').reduce((acc, next) => {
    const match = Array.from(
      next.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine))|\d/g)
    ).reduce((acc, next) => [...acc, ...next.filter((n) => n)], []);
    const numberDictionary: { [key: string]: number } = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };
    return (
      acc +
      +`${numberDictionary[match[0]] || match[0]}${
        numberDictionary[match[match.length - 1]] || match[match.length - 1]
      }`
    );
  }, 0);
};

const expectedSecondSolution = 55343;

export { first, expectedFirstSolution, second, expectedSecondSolution };
