// thanks to https://www.reddit.com/r/adventofcode/comments/18nevo3/comment/kebdjjr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const fill = (grid: string[][], rs: number, cs: number, n: number) => {
  const size = grid.length;
  let set = new Set<string>();

  set.add(`${rs},${cs}`);
  for (let i = 0; i < n - 1; i++) {
    const nSet = new Set<string>();
    for (const p of set.values()) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of DIRECTIONS) {
        const rr = r + dr;
        const cc = c + dc;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) {
          continue;
        }
        if (grid[rr][cc] === '.' || grid[rr][cc] === 'S') {
          nSet.add(`${rr},${cc}`);
        }
      }
    }
    set = nSet;
  }
  return set.size;
};

const first = (input: string) => {
  let startPosition: number[] = [];
  const grid = input.split('\n').map((l, i) => {
    const row = l.split('');
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'S') {
        startPosition = [i, j];
      }
    }
    return row;
  });
  return fill(grid, startPosition[0], startPosition[1], 65);
};

const expectedFirstSolution = 3666;

const second = (input: string) => {
  let startPosition: number[] = [];
  const grid = input.split('\n').map((l, i) => {
    const row = l.split('');
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'S') {
        startPosition = [i, j];
      }
    }
    return row;
  });

  if (grid.length !== grid[0].length) {
    throw new Error('Invalid grid length');
  }

  const size = grid.length;
  const steps = 26501365;

  const [si, sj] = startPosition;

  if (si !== Math.floor(size / 2) && sj !== Math.floor(size / 2)) {
    throw new Error('Unexpected start position');
  }

  if (steps % size !== Math.floor(size / 2)) {
    throw new Error('Unexpected steps number');
  }

  const N = 26501365;
  const n = N % size;

  const [rs, cs] = startPosition;
  const sm = [
    [size - 1, size - 1, n],
    [size - 1, 0, n],
    [0, size - 1, n],
    [0, 0, n],
  ].map(([r, c, n]) => fill(grid, r, c, n));

  const lg = [
    [size - 1, size - 1, n + size],
    [size - 1, 0, n + size],
    [0, size - 1, n + size],
    [0, 0, n + size],
  ].map(([r, c, n]) => fill(grid, r, c, n));

  const pt = [
    [0, cs, size],
    [size - 1, cs, size],
    [rs, 0, size],
    [rs, size - 1, size],
  ].map(([r, c, n]) => fill(grid, r, c, n));

  const f = [fill(grid, rs, cs, size - 1), fill(grid, rs, cs, size)];

  const m = (N - n) / size;
  let res = 0;
  res += sm.reduce((a, n) => a + n) * m;
  res += lg.reduce((a, n) => a + n) * (m - 1);
  res += pt.reduce((a, n) => a + n);
  res += f[0] * (m - 1) ** 2;
  res += f[1] * m ** 2;

  return [res];
};

const expectedSecondSolution = 609298746763952;

export { first, expectedFirstSolution, second, expectedSecondSolution };
