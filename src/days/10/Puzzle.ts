const toKey = (a: number, b: number) => `${a}-${b}`;

const first = (input: string) => {
  let start: number[] = [];
  const grid = input.split('\n').map((l, i) => {
    const startCol = l.indexOf('S');
    if (startCol !== -1) {
      start = [i, startCol];
    }
    return l.split('');
  });

  let toVisit = [[start[0], start[1]]];
  const visited = new Set([toKey(start[0], start[1])]);

  let possibileS = new Set(['|', '-', 'J', 'L', '7', 'F']);
  while (toVisit.length) {
    const [i, j] = toVisit[0];
    const item = grid[i][j];
    toVisit = toVisit.slice(1);

    if (
      i > 0 &&
      'S|JL'.includes(item) &&
      '|7F'.includes(grid[i - 1][j]) &&
      !visited.has(toKey(i - 1, j))
    ) {
      visited.add(toKey(i - 1, j));
      toVisit.push([i - 1, j]);
      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['|', 'J', 'L'].includes(i))
        );
      }
    }

    if (
      i < grid.length - 1 &&
      'S|7F'.includes(item) &&
      '|JL'.includes(grid[i + 1][j]) &&
      !visited.has(toKey(i + 1, j))
    ) {
      visited.add(toKey(i + 1, j));
      toVisit.push([i + 1, j]);
      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['|', '7', 'F'].includes(i))
        );
      }
    }

    if (
      j > 0 &&
      '-SJ7'.includes(item) &&
      '-FL'.includes(grid[i][j - 1]) &&
      !visited.has(toKey(i, j - 1))
    ) {
      visited.add(toKey(i, j - 1));
      toVisit.push([i, j - 1]);

      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['-', 'J', '7'].includes(i))
        );
      }
    }

    if (
      j < grid[i].length - 1 &&
      'S-FL'.includes(item) &&
      '-J7'.includes(grid[i][j + 1]) &&
      !visited.has(toKey(i, j + 1))
    ) {
      visited.add(toKey(i, j + 1));
      toVisit.push([i, j + 1]);
      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['-', 'L', 'F'].includes(i))
        );
      }
    }
  }

  grid[start[0]][start[1]] = [...possibileS.values()][0];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited.has(toKey(i, j))) {
        grid[i][j] = '.';
      }
    }
  }

  return visited.size / 2;
};

const expectedFirstSolution = 7173;

const second = (input: string) => {
  let start: number[] = [];
  const grid = input.split('\n').map((l, i) => {
    const startCol = l.indexOf('S');
    if (startCol !== -1) {
      start = [i, startCol];
    }
    return l.split('');
  });

  let toVisit = [[start[0], start[1]]];
  const visited = new Set([toKey(start[0], start[1])]);

  let possibileS = new Set(['|', '-', 'J', 'L', '7', 'F']);
  while (toVisit.length) {
    const [i, j] = toVisit[0];
    const item = grid[i][j];
    toVisit = toVisit.slice(1);

    if (
      i > 0 &&
      'S|JL'.includes(item) &&
      '|7F'.includes(grid[i - 1][j]) &&
      !visited.has(toKey(i - 1, j))
    ) {
      visited.add(toKey(i - 1, j));
      toVisit.push([i - 1, j]);
      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['|', 'J', 'L'].includes(i))
        );
      }
    }

    if (
      i < grid.length - 1 &&
      'S|7F'.includes(item) &&
      '|JL'.includes(grid[i + 1][j]) &&
      !visited.has(toKey(i + 1, j))
    ) {
      visited.add(toKey(i + 1, j));
      toVisit.push([i + 1, j]);
      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['|', '7', 'F'].includes(i))
        );
      }
    }

    if (
      j > 0 &&
      '-SJ7'.includes(item) &&
      '-FL'.includes(grid[i][j - 1]) &&
      !visited.has(toKey(i, j - 1))
    ) {
      visited.add(toKey(i, j - 1));
      toVisit.push([i, j - 1]);

      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['-', 'J', '7'].includes(i))
        );
      }
    }

    if (
      j < grid[i].length - 1 &&
      'S-FL'.includes(item) &&
      '-J7'.includes(grid[i][j + 1]) &&
      !visited.has(toKey(i, j + 1))
    ) {
      visited.add(toKey(i, j + 1));
      toVisit.push([i, j + 1]);
      if (item === 'S') {
        possibileS = new Set(
          [...possibileS].filter((i) => ['-', 'L', 'F'].includes(i))
        );
      }
    }
  }

  grid[start[0]][start[1]] = [...possibileS.values()][0];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited.has(toKey(i, j))) {
        grid[i][j] = '.';
      }
    }
  }
  const outside = new Set();
  for (let r = 0; r < grid.length; r++) {
    let within = false;
    let up = null;

    for (let c = 0; c < grid[r].length; c++) {
      const ch = grid[r][c];

      if (ch === '|') {
        if (up !== null) {
          throw new Error('Assertion error: up should be null');
        }
        within = !within;
      } else if (ch === '-') {
        if (up === null) {
          throw new Error(`Assertion error: up should not be null ${r} ${c}`);
        }
      } else if (ch === 'L' || ch === 'F') {
        if (up !== null) {
          throw new Error(`Assertion error: up should be null ${r} ${c}`);
        }
        up = ch === 'L';
      } else if (ch === '7' || ch === 'J') {
        if (up === null) {
          throw new Error('Assertion error: up should not be null');
        }
        if (ch !== (up ? 'J' : '7')) {
          within = !within;
        }
        up = null;
      } else if (ch === '.') {
        // do nothing
      } else {
        throw new Error(`Unexpected character (horizontal): ${ch}`);
      }

      if (!within) {
        outside.add(toKey(r, c));
      }
    }
  }

  const union = new Set([...outside.values(), ...visited]);

  return grid.length * grid[0].length - union.size;
};

const expectedSecondSolution = 291;

export { first, expectedFirstSolution, second, expectedSecondSolution };
