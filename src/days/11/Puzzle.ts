const key = (a: number, b: number) => `${a}-${b}`;
const fromKey = (k: string) => k.split('-').map((s) => +s);
const manhattanDistance = (x: number, y: number, x1: number, y1: number) =>
  Math.abs(x - x1) + Math.abs(y - y1);

const computeSum = (input: string, increment: number) => {
  let rowIndex = 0;
  const minCol = 0;
  const lines = input.split('\n');
  const maxCol = lines[0].length - 1;

  const points = input.split('\n').flatMap((row) => {
    let hasGalaxies = false;
    const points = [];

    for (let i = 0; i < row.length; i++) {
      if (row[i] === '#') {
        hasGalaxies = true;
        points.push([rowIndex, i]);
      }
    }
    rowIndex = hasGalaxies ? rowIndex + 1 : rowIndex + increment;
    return points;
  });

  // increment cols
  const pointsToShift = new Map<string, number>();
  for (let i = minCol; i <= maxCol; i++) {
    const hasGalaxies = points.filter(([, y]) => i === y);
    if (!hasGalaxies.length) {
      const pointsToChange = points.filter(([, y]) => y > i);
      for (const [x, y] of pointsToChange) {
        const existing = pointsToShift.get(key(x, y));
        if (existing) {
          pointsToShift.set(key(x, y), existing + increment - 1);
        } else {
          pointsToShift.set(key(x, y), y + increment - 1);
        }
      }
    }
  }

  for (const point of pointsToShift) {
    const [x, y] = fromKey(point[0]);
    points.find(([i, j]) => i === x && j === y)[1] = point[1];
  }

  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      const distance = manhattanDistance(x1, y1, x2, y2);
      sum += distance;
    }
  }

  return sum;
};

const first = (input: string) => {
  return computeSum(input, 2);
};

const expectedFirstSolution = 9947476;

const second = (input: string) => {
  return computeSum(input, 1000000);
};

const expectedSecondSolution = 519939907614;

export { first, expectedFirstSolution, second, expectedSecondSolution };
