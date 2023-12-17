import heapq from './heapq.js';

/**
 * q def
 * i row,
 * j column,
 * di row direction
 * dj column direction
 * d steps in the same direction
 * cost
 * [i,j,di,dj,d,cost]
 */

const stateToString = (
  i: number,
  j: number,
  di: number,
  dj: number,
  d: number
) => `${i}%${j}%${di}%${dj}%${d}`;

const cmp = (a: number[], b: number[]) => a[a.length - 1] < b[b.length - 1];

const first = (input: string) => {
  const grid = input.split('\n').map((l) => l.split('').map(Number));
  const heap: number[][] = [];
  heapq.push(heap, [0, 0, 0, 0, 0, 0], cmp);
  const seen = new Set<string>();

  while (heap.length) {
    const [i, j, di, dj, d, cost] = heapq.pop(heap, cmp);

    if (i === grid.length - 1 && j === grid[0].length - 1) {
      return cost;
    }

    const key = stateToString(i, j, di, dj, d);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    if (d < 3 && ![di, dj].every((v, i) => [0, 0][i] === v)) {
      const ni = i + di;
      const nj = j + dj;

      if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length) {
        heapq.push(heap, [ni, nj, di, dj, d + 1, cost + grid[ni][nj]], cmp);
      }
    }

    for (const [ndi, ndj] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      if (
        ![ndi, ndj].every((v, i) => v === [di, dj][i]) &&
        ![ndi, ndj].every((v, i) => v === [-di, -dj][i])
      ) {
        const ni = i + ndi;
        const nj = j + ndj;
        if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length) {
          heapq.push(heap, [ni, nj, ndi, ndj, 1, cost + grid[ni][nj]], cmp);
        }
      }
    }
  }
};

const expectedFirstSolution = 855;

const second = (input: string) => {
  const grid = input.split('\n').map((l) => l.split('').map(Number));
  const heap: number[][] = [];
  heapq.push(heap, [0, 0, 0, 0, 0, 0], cmp);
  const seen = new Set<string>();

  while (heap.length) {
    const [i, j, di, dj, d, cost] = heapq.pop(heap, cmp);

    if (i === grid.length - 1 && j === grid[0].length - 1) {
      return cost;
    }

    const key = stateToString(i, j, di, dj, d);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    if (d < 10 && ![di, dj].every((v, i) => [0, 0][i] === v)) {
      const ni = i + di;
      const nj = j + dj;

      if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length) {
        heapq.push(heap, [ni, nj, di, dj, d + 1, cost + grid[ni][nj]], cmp);
      }
    }

    if (d >= 4 || (di === 0 && dj === 0)) {
      for (const [ndi, ndj] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        if (
          ![ndi, ndj].every((v, i) => v === [di, dj][i]) &&
          ![ndi, ndj].every((v, i) => v === [-di, -dj][i])
        ) {
          const ni = i + ndi;
          const nj = j + ndj;
          if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length) {
            heapq.push(heap, [ni, nj, ndi, ndj, 1, cost + grid[ni][nj]], cmp);
          }
        }
      }
    }
  }
};

const expectedSecondSolution = 980;

export { first, expectedFirstSolution, second, expectedSecondSolution };
