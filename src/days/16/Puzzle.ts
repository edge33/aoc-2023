const stateToString = (i: number, j: number, di: number, dj: number) =>
  `${i}%${j}%${di}%${dj}`;

const energize = (
  grid: string[][],
  start: [number, number, number, number]
) => {
  let q = [start];

  const seen = new Set<string>();
  const energizedPositions = new Set<string>();
  while (q.length) {
    const beam = q[0];
    let [i, j, di, dj] = beam;
    q = q.slice(1);

    i += di;
    j += dj;

    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) {
      continue;
    }

    const element = grid[i][j];

    if (
      element === '.' ||
      (element === '-' && dj !== 0) ||
      (element === '|' && di !== 0)
    ) {
      const toString = stateToString(i, j, di, dj);
      if (!seen.has(toString)) {
        seen.add(toString);
        energizedPositions.add(`${i}%${j}`);
        q.push([i, j, di, dj]);
      }
    } else if (element === '/') {
      /**
       * -> -----> ^  0,1  -> -1, 0
       * V  -----> <- 1,0  -> 0, -1
       * <- -----> V  0,-1 -> 1, 0
       * ^  -----> -> -1,0 -> 0, 1
       */

      const temp = di;
      di = -dj;
      dj = -temp;
      const toString = stateToString(i, j, di, dj);
      if (!seen.has(toString)) {
        seen.add(toString);
        energizedPositions.add(`${i}%${j}`);
        q.push([i, j, di, dj]);
      }
    } else if (element === '\\') {
      /**
       * -> -----> V  0,1  -> 1, 0
       * V  -----> -> 1,0  -> 0, 1
       * <- -----> ^  0,-1 -> , -1,0
       * ^  -----> <- -1,0 -> 0, -1
       */
      const temp = di;
      di = dj;
      dj = temp;
      const toString = stateToString(i, j, di, dj);
      if (!seen.has(toString)) {
        seen.add(toString);
        energizedPositions.add(`${i}%${j}`);
        q.push([i, j, di, dj]);
      }
    } else if (element === '|') {
      for (const [di, dj] of [
        [-1, 0],
        [1, 0],
      ]) {
        const toString = stateToString(i, j, di, dj);
        if (!seen.has(toString)) {
          seen.add(toString);
          energizedPositions.add(`${i}%${j}`);
          q.push([i, j, di, dj]);
        }
      }
    } else if (element === '-') {
      for (const [di, dj] of [
        [0, -1],
        [0, 1],
      ]) {
        const toString = stateToString(i, j, di, dj);
        if (!seen.has(toString)) {
          seen.add(toString);
          energizedPositions.add(`${i}%${j}`);
          q.push([i, j, di, dj]);
        }
      }
    }
  }

  return energizedPositions.size;
};

const first = (input: string) => {
  const grid = input.split('\n').map((l) => l.split(''));

  return energize(grid, [0, -1, 0, 1]);
};

const expectedFirstSolution = 6740;

const second = (input: string) => {
  const grid = input.split('\n').map((l) => l.split(''));

  let maxEnergy = 0;
  for (let i = 0; i < grid.length; i++) {
    maxEnergy = Math.max(maxEnergy, energize(grid, [i, -1, 0, 1]));
    maxEnergy = Math.max(maxEnergy, energize(grid, [i, grid[i].length, 0, -1]));
  }

  for (let j = 0; j < grid[0].length; j++) {
    maxEnergy = Math.max(maxEnergy, energize(grid, [-1, j, 1, 0]));
    maxEnergy = Math.max(
      maxEnergy,
      energize(grid, [grid.length + 1, j, -1, 0])
    );
  }

  return maxEnergy;
};

const expectedSecondSolution = 7041;

export { first, expectedFirstSolution, second, expectedSecondSolution };
