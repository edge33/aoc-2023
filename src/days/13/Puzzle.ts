const findReflectingColumn = (grid: string[][], bestDifference = false) => {
  const length = grid[0].length;
  let currentLength = length % 2 === 0 ? length : length - 1;

  while (currentLength > 1) {
    for (const [start, end] of [
      [0, currentLength],
      [length - currentLength, length],
    ]) {
      const row = grid[0];
      const sliced = row.slice(start, end);

      const half = sliced.slice(0, sliced.length / 2);
      const rightHalf = sliced.slice(half.length).reverse();

      if (bestDifference) {
        let diff = 0;
        for (const row of grid) {
          const sliced = row.slice(start, end);

          const half = sliced.slice(0, sliced.length / 2);
          const rightHalf = sliced.slice(half.length).reverse();
          for (let i = 0; i < half.length; i++) {
            if (half[i] !== rightHalf[i]) {
              diff++;
            }
          }
        }
        if (diff === 1) {
          return sliced.length / 2 + start;
        }
      } else {
        if (half.join('') === rightHalf.join('')) {
          let valid = true;
          for (const row of grid.slice(1)) {
            const sliced = row.slice(start, end);

            const half = sliced.slice(0, sliced.length / 2);
            const rightHalf = sliced.slice(half.length).reverse();
            if (half.join('') !== rightHalf.join('')) {
              valid = false;
              break;
            }
          }
          if (valid) {
            return sliced.length / 2 + start;
          }
        }
      }
    }

    currentLength = currentLength - 2;
  }
  return null;
};

const flipGrid = (grid: string[][]) => {
  const flipped = new Array(grid[0].length);
  let i = 0;
  for (let col = grid[0].length - 1; col >= 0; col--) {
    flipped[i] = [];
    for (let row = 0; row < grid.length; row++) {
      flipped[i].push(grid[row][col]);
    }
    i++;
  }
  return flipped;
};

const first = (input: string) => {
  return input.split('\n\n').reduce((acc, lines) => {
    const grid = lines.split('\n').map((l) => l.split(''));

    let reflection = findReflectingColumn(grid);
    if (reflection) {
      return acc + reflection;
    }
    reflection = findReflectingColumn(flipGrid(grid));

    return acc + reflection * 100;
  }, 0);
};

const expectedFirstSolution = 42974;

const second = (input: string) => {
  return input.split('\n\n').reduce((acc, lines) => {
    const grid = lines.split('\n').map((l) => l.split(''));

    let reflection = findReflectingColumn(grid, true);
    if (reflection) {
      return acc + reflection;
    }

    const flipped = flipGrid(grid);
    reflection = findReflectingColumn(flipped, true);

    return acc + reflection * 100;
  }, 0);
};

const expectedSecondSolution = 27587;

export { first, expectedFirstSolution, second, expectedSecondSolution };
