const computeProduct = (times: number[], distances: number[]) => {
  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let count = 0;

    for (let start = time - 1; start >= 2; start--) {
      if (start * (time - start) > distance) {
        count++;
      }
    }
    product *= count;
  }
  return product;
};

const first = (input: string) => {
  const [times, distances] = input
    .split('\n')
    .map((l) => l.match(/\d+/g).map((n) => +n));

  return computeProduct(times, distances);
};

const expectedFirstSolution = 114400;

const second = (input: string) => {
  const [time, distance] = input
    .split('\n')
    .map((l) => +l.match(/\d+/g).join(''));

  return computeProduct([time], [distance]);
};

const expectedSecondSolution = 21039729;

export { first, expectedFirstSolution, second, expectedSecondSolution };
