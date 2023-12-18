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

const computeMinimum = (
  input: string,
  maxConsecutiveSteps: number,
  minStepsBeforeTurn: number
) => {
  const grid = input.split('\n').map((l) => l.split('').map(Number));
  let queue = new Set<string>([stateToString(0, 0, 0, 0, 0)]);
  const seen = new Map<string, number>([[stateToString(0, 0, 0, 0, 0), 0]]);

  let min = Infinity;
  while (queue.size) {
    const newQueue = new Set<string>();

    for (const element of queue) {
      const [i, j, di, dj, d] = element.split('%').map(Number);
      const cost = seen.get(element);

      //   if (i === grid.length - 1 && j === grid[0].length - 1) {
      //     return cost;
      //   }

      if (
        d < maxConsecutiveSteps &&
        ![di, dj].every((v, i) => [0, 0][i] === v)
      ) {
        const ni = i + di;
        const nj = j + dj;

        if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length) {
          const newCost = cost + grid[ni][nj];

          const key = stateToString(ni, nj, di, dj, d + 1);
          const currentCost = seen.get(key);

          if (!currentCost || newCost < currentCost) {
            //   heapq.push(heap, [ni, nj, di, dj, d + 1, cost + grid[ni][nj]], cmp);
            newQueue.add(key);
            seen.set(key, newCost);

            if (ni === grid.length - 1 && nj === grid[0].length - 1) {
              if (newCost < min) {
                min = newCost;
              }
            }
          }
        }
      }

      if (d >= minStepsBeforeTurn || (di === 0 && dj === 0)) {
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
              const newCost = cost + grid[ni][nj];
              const key = stateToString(ni, nj, ndi, ndj, 1);
              const currentCost = seen.get(key);
              if (!currentCost || newCost < currentCost) {
                newQueue.add(key);
                seen.set(key, newCost);
                // heapq.push(heap, [ni, nj, ndi, ndj, 1, cost + grid[ni][nj]], cmp);

                if (ni === grid.length - 1 && nj === grid[0].length - 1) {
                  if (newCost < min) {
                    min = newCost;
                  }
                }
              }
            }
          }
        }
      }
    }
    queue = newQueue;
  }
  return min;
};

const first = (input: string) => {
  return computeMinimum(input, 3, 0);
};

const expectedFirstSolution = 855;

const second = (input: string) => {
  return computeMinimum(input, 10, 4);
};

const expectedSecondSolution = 980;

export { first, expectedFirstSolution, second, expectedSecondSolution };
