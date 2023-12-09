const first = (input: string) => {
  return input.split('\n').reduce((acc, line) => {
    const numbers = line.split(' ').map((n) => +n);
    let diffs = [];
    let data = numbers;
    const allDiffs = [];
    do {
      diffs = data
        .slice(1)
        .reduce((acc, next, i) => [...acc, next - data[i]], [] as number[]);
      data = diffs;
      allDiffs.push(diffs);
    } while (diffs.reduce((acc, next) => acc + next, 0) !== 0);

    const nextVal = allDiffs.reverse().reduce((a, n) => a + n[n.length - 1], 0);

    return acc + numbers[numbers.length - 1] + nextVal;
  }, 0);
};

const expectedFirstSolution = 1637452029;

const second = (input: string) => {
  return input.split('\n').reduce((acc, line) => {
    const numbers = line.split(' ').map((n) => +n);
    let diffs = [];
    let data = numbers;

    const allDiffs = [];
    do {
      diffs = data
        .slice(1)
        .reduce((acc, next, i) => [...acc, next - data[i]], [] as number[]);
      data = diffs;
      allDiffs.push(diffs);
    } while (diffs.reduce((acc, next) => acc + next, 0) !== 0);

    const nextVal = allDiffs.reverse().reduce((a, n) => n[0] - a, 0);

    return acc + numbers[0] - nextVal;
  }, 0);
};

const expectedSecondSolution = 908;

export { first, expectedFirstSolution, second, expectedSecondSolution };
