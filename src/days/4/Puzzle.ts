const first = (input: string) => {
  return input.split('\n').reduce((acc, line) => {
    const [left, right] = line.split(':')[1].split(' | ');
    const winners = left
      .trim()
      .split(/\s+/)
      .map((n) => +n);
    const mine = right
      .trim()
      .split(/\s+/)
      .map((n) => +n);
    const count = mine.reduce((a, n) => (winners.includes(n) ? a + 1 : a), 0);
    return acc + (count <= 2 ? count : Math.pow(2, count - 1));
  }, 0);
};

const expectedFirstSolution = 18519;

const second = (input: string) => {
  const instances: number[] = [];
  input.split('\n').reduce((acc, line, index) => {
    const [left, right] = line.split(':')[1].split(' | ');
    const winners = left
      .trim()
      .split(/\s+/)
      .map((n) => +n);
    const mine = right
      .trim()
      .split(/\s+/)
      .map((n) => +n);
    const count = mine.reduce((a, n) => (winners.includes(n) ? a + 1 : a), 0);
    if (!instances[index]) {
      instances[index] = 1;
    } else {
      instances[index] += 1;
    }

    if (count > 0) {
      for (let i = index + 1; i <= index + count; i++) {
        if (!instances[i]) {
          instances[i] = instances[index];
        } else {
          instances[i] += instances[index];
        }
      }
    }

    return acc + Math.pow(2, count - 1);
  }, 0);

  return instances.reduce((acc, next) => acc + next, 0);
};

const expectedSecondSolution = 11787590;

export { first, expectedFirstSolution, second, expectedSecondSolution };
