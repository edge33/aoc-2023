const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const NEIGHBOORS: { [key: string]: number[][] } = {
  '.': [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  '^': [[-1, 0]],
  '>': [[0, 1]],
  v: [[1, 0]],
  '<': [[0, -1]],
};

// const bruteforce = () => {
//   while (q.length) {
//     let [i, j, steps, visited] = q.shift();
//     visited.add(toKey(i, j));

//     // if (i === ei && j === ej) {
//     //   if (!max || steps > max) {
//     //     max = steps;
//     //   }
//     // }

//     // keep moving along the path while no direction change can be made
//     let neighboors: number[][] = [];
//     do {
//       neighboors = DIRECTIONS.reduce((acc, [di, dj]) => {
//         const ni = i + di;
//         const nj = j + dj;
//         if (
//           ni < 0 ||
//           ni > grid.length - 1 ||
//           nj < 0 ||
//           nj > grid[0].length - 1 ||
//           visited.has(toKey(ni, nj))
//         ) {
//           return acc;
//         }

//         if (grid[ni][nj] !== '#') {
//           return [...acc, [di, dj]];
//         }

//         return [...acc];
//       }, [] as number[][]);
//       if (neighboors.length === 1) {
//         const [di, dj] = neighboors[0];
//         i = i + di;
//         j = j + dj;
//         if (grid[i][j] === '^') {
//           if (di !== -1 || dj !== 0) {
//             throw new Error(
//               `invalid path ^ with direction ${di}, ${dj} at ${i},${j}`
//             );
//           }
//         }
//         if (grid[i][j] === '>') {
//           if (di !== 0 || dj !== 1) {
//             throw new Error(
//               `invalid path > with direction ${di}, ${dj} at ${i},${j}`
//             );
//           }
//         }
//         if (grid[i][j] === 'v') {
//           if (di !== 1 || dj !== 0) {
//             throw new Error(
//               `invalid path v with direction ${di}, ${dj} at ${i},${j}`
//             );
//           }
//         }
//         if (grid[i][j] === '<') {
//           if (di !== 0 || dj !== -1) {
//             throw new Error(
//               `invalid path < with direction ${di}, ${dj} at ${i},${j}`
//             );
//           }
//         }

//         visited.add(toKey(i, j));

//         steps = steps + 1;
//         if (i === ei && j === ej) {
//           // console.log('path', steps);

//           if (!max || steps > max) {
//             max = steps;
//           }
//         }
//       }
//     } while (neighboors.length === 1);

//     if (neighboors.length > 1) {
//       for (const [di, dj] of neighboors) {
//         const ni = i + di;
//         const nj = j + dj;
//         const nSteps = steps + 1;

//         if (
//           ni < 0 ||
//           ni > grid.length - 1 ||
//           nj < 0 ||
//           nj > grid[0].length - 1 ||
//           visited.has(toKey(ni, nj))
//         ) {
//           continue;
//         }

//         if (di === -1 && dj === 0 && grid[ni][nj] === 'v') {
//           continue;
//         }

//         if (di === 0 && dj === 1 && grid[ni][nj] === '<') {
//           continue;
//         }

//         if (di === 1 && dj === 0 && grid[ni][nj] === '^') {
//           continue;
//         }

//         if (di === 0 && dj === -1 && grid[ni][nj] === '>') {
//           continue;
//         }

//         if (grid[ni][nj] !== '#') {
//           q.push([ni, nj, nSteps, new Set(visited)]);
//         }
//       }
//     }
//   }

// }

// const toKey = (i: number, j: number) => `${i},${j}`;
const toKey = (i: number, j: number) => `${i}-${j}`;

const first = (input: string) => {
  const grid = input.split('\n').map((l) => l.split(''));
  const [si, sj] = [0, 1];
  const [ei, ej] = [
    grid.length - 1,
    grid[grid.length - 1].findIndex((v) => v === '.'),
  ];

  const points = [
    [si, sj],
    [ei, ej],
  ];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== '#') {
        let count = 0;

        for (const [di, dj] of DIRECTIONS) {
          const ni = i + di;
          const nj = j + dj;
          if (
            ni < 0 ||
            ni > grid.length - 1 ||
            nj < 0 ||
            nj > grid[0].length - 1
          ) {
            continue;
          }
          if (grid[ni][nj] !== '#') {
            count++;
          }
        }
        if (count >= 3) {
          points.push([i, j]);
        }
      }
    }
  }

  const graph = points.reduce(
    (a, [i, j]) => ({ ...a, [toKey(i, j)]: {} }),
    {} as { [key: string]: { [key: string]: number } }
  );

  for (const [si, sj] of points) {
    const q = [[si, sj, 0]];
    const visited = new Set<string>(toKey(si, sj));
    visited.add(toKey(si, sj));
    while (q.length) {
      const [i, j, steps] = q.pop();

      if (steps !== 0 && points.find(([pi, pj]) => pi === i && pj === j)) {
        // console.log(si, sj, '->', i, j, steps);

        graph[toKey(si, sj)][toKey(i, j)] = steps;
        continue;
      }

      for (const [di, dj] of NEIGHBOORS[grid[i][j]]) {
        const ni = i + di;
        const nj = j + dj;
        if (
          ni < 0 ||
          ni > grid.length - 1 ||
          nj < 0 ||
          nj > grid[0].length - 1 ||
          grid[ni][nj] === '#' ||
          visited.has(toKey(ni, nj))
        ) {
          continue;
        }

        q.push([ni, nj, steps + 1]);
        visited.add(toKey(ni, nj));
      }
    }
  }

  const visited = new Set<string>();
  const dfs = (node: string) => {
    if (node === toKey(ei, ej)) {
      return 0;
    }

    let max = -Infinity;
    visited.add(node);
    for (const [nextNode, nextSteps] of Object.entries(graph[node])) {
      if (!visited.has(nextNode)) {
        max = Math.max(max, dfs(nextNode) + nextSteps);
      }
    }
    visited.delete(node);
    return max;
  };
  return dfs(toKey(si, sj));
};

const expectedFirstSolution = 2330;

const second = (input: string) => {
  const grid = input.split('\n').map((l) => l.split(''));
  const [si, sj] = [0, 1];
  const [ei, ej] = [
    grid.length - 1,
    grid[grid.length - 1].findIndex((v) => v === '.'),
  ];

  const points = [
    [si, sj],
    [ei, ej],
  ];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== '#') {
        let count = 0;

        for (const [di, dj] of DIRECTIONS) {
          const ni = i + di;
          const nj = j + dj;
          if (
            ni < 0 ||
            ni > grid.length - 1 ||
            nj < 0 ||
            nj > grid[0].length - 1
          ) {
            continue;
          }
          if (grid[ni][nj] !== '#') {
            count++;
          }
        }
        if (count >= 3) {
          points.push([i, j]);
        }
      }
    }
  }

  const graph = points.reduce(
    (a, [i, j]) => ({ ...a, [toKey(i, j)]: {} }),
    {} as { [key: string]: { [key: string]: number } }
  );

  for (const [si, sj] of points) {
    const q = [[si, sj, 0]];
    const visited = new Set<string>(toKey(si, sj));
    visited.add(toKey(si, sj));
    while (q.length) {
      const [i, j, steps] = q.pop();

      if (steps !== 0 && points.find(([pi, pj]) => pi === i && pj === j)) {
        // console.log(si, sj, '->', i, j, steps);

        graph[toKey(si, sj)][toKey(i, j)] = steps;
        continue;
      }

      for (const [di, dj] of NEIGHBOORS['.']) {
        const ni = i + di;
        const nj = j + dj;
        if (
          ni < 0 ||
          ni > grid.length - 1 ||
          nj < 0 ||
          nj > grid[0].length - 1 ||
          grid[ni][nj] === '#' ||
          visited.has(toKey(ni, nj))
        ) {
          continue;
        }

        q.push([ni, nj, steps + 1]);
        visited.add(toKey(ni, nj));
      }
    }
  }

  const visited = new Set<string>();
  const dfs = (node: string) => {
    if (node === toKey(ei, ej)) {
      return 0;
    }

    let max = -Infinity;
    visited.add(node);
    for (const [nextNode, nextSteps] of Object.entries(graph[node])) {
      if (!visited.has(nextNode)) {
        max = Math.max(max, dfs(nextNode) + nextSteps);
      }
    }
    visited.delete(node);
    return max;
  };

  return dfs(toKey(si, sj));
};

const expectedSecondSolution = 6518;

export { first, expectedFirstSolution, second, expectedSecondSolution };
