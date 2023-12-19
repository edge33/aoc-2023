// https://en.wikipedia.org/wiki/Shoelace_formula
const computeShoelaceArea = (points: number[][]) =>
  Math.abs(
    points
      .slice(0, points.length - 1)
      .reduce(
        (acc, [i, j], idx) =>
          acc + (i * points[idx + 1][1] - points[idx + 1][0] * j),
        0
      ) / 2
  );

const directions: { [key: string]: number[] } = {
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
  U: [-1, 0],
};

const first = (input: string) => {
  const points = [[0, 0]];
  let boundaryPoints = 0;
  input.split('\n').map((line) => {
    const [direction, steps_] = line.split(' ');
    const steps = +steps_;
    boundaryPoints += steps;
    const [di, dj] = directions[direction];
    const [i, j] = points[points.length - 1];
    points.push([i + di * steps, j + dj * steps]);
  }, 0);

  const shoeLaceArea = computeShoelaceArea(points);

  // compute i according to https://en.wikipedia.org/wiki/Pick%27s_theorem
  const i = shoeLaceArea - boundaryPoints / 2 + 1;

  return i + boundaryPoints;
};

const expectedFirstSolution = 46394;

const second = (input: string) => {
  const points = [[0, 0]];
  let boundaryPoints = 0;
  input.split('\n').map((line) => {
    const [, , value] = line.split(' ');
    const steps = parseInt(value.slice(2, value.length - 2), 16);
    const direction = 'RDLU'[+value[value.length - 2]];

    boundaryPoints += steps;
    const [di, dj] = directions[direction];
    const [i, j] = points[points.length - 1];
    points.push([i + di * steps, j + dj * steps]);
  }, 0);

  const shoeLaceArea = computeShoelaceArea(points);

  // compute i according to https://en.wikipedia.org/wiki/Pick%27s_theorem
  const i = shoeLaceArea - boundaryPoints / 2 + 1;

  return i + boundaryPoints;
};

const expectedSecondSolution = 201398068194715;

export { first, expectedFirstSolution, second, expectedSecondSolution };
