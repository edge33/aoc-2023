const cache: { [key: string]: number } = {};

const count = (line: string, numbers: number[]) => {
  if (line === '') {
    return numbers.length === 0 ? 1 : 0;
  }
  if (numbers.length === 0) {
    return line.includes('#') ? 0 : 1;
  }
  const key = `${line}-${numbers.join(',')}`;
  if (key in cache) {
    return cache[key];
  }

  let result = 0;
  if ('.?'.includes(line[0])) {
    result += count(line.slice(1), numbers);
  }
  if ('#?'.includes(line[0])) {
    if (
      numbers[0] <= line.length &&
      !line.slice(0, numbers[0]).includes('.') &&
      (numbers[0] === line.length || line[numbers[0]] !== '#')
    ) {
      result += count(line.slice(numbers[0] + 1), numbers.slice(1));
    }
  }
  cache[key] = result;
  return result;
};

const first = (input: string) => {
  return input.split('\n').reduce((acc, next) => {
    const [line, numbers_] = next.split(' ');
    const numbers = numbers_.split(',').map(Number);

    return acc + count(line, numbers);
  }, 0);
};

const expectedFirstSolution = 8180;

const second = (input: string) => {
  return input.split('\n').reduce((acc, next) => {
    const [line, numbers] = next.split(' ');
    const filledLine = new Array(5).fill(line).join('?');
    const filledNumbers = new Array(5)
      .fill(numbers)
      .flatMap((a) => a.split(',').map(Number));

    return acc + count(filledLine, filledNumbers);
  }, 0);
};

const expectedSecondSolution = 620189727003627;

export { first, expectedFirstSolution, second, expectedSecondSolution };
