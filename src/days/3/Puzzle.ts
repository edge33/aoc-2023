const buildState = (input: string) => input.split('\n').map((l) => l.split(''));

const first = (input: string) => {
  const state = buildState(input);

  // let currentNumber
  let sum = 0;
  for (let i = 0; i < state.length; i++) {
    const line = state[i].join('');
    const matches = [...line.matchAll(/\d+/g)];

    for (const match of matches) {
      const start = match.index;
      const end = match.index + match[0].length - 1;
      for (let i1 = i - 1; i1 <= i + 1; i1++) {
        for (let j1 = start - 1; j1 <= end + 1; j1++) {
          if (i1 === i && j1 >= start && j1 <= end) {
            continue;
          }
          if (state[i1] && state[i1][j1] && state[i1][j1] !== '.') {
            sum += +match[0];
            break;
          }
        }
      }
    }
  }

  return sum;
};

const scan = (line: string[], start: number) => {
  let number = `${line[start]}`;
  let index = start - 1;
  while (line[index] && line[index].match(/\d/)) {
    number = `${line[index]}${number}`;
    index--;
  }

  index = start + 1;
  while (line[index] && line[index].match(/\d/)) {
    number = `${number}${line[index]}`;
    index++;
  }
  return +number;
};

const expectedFirstSolution = 525911;

const second = (input: string) => {
  const state = buildState(input);
  let total = 0;
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === '*') {
        const neighboorhood = [
          [i - 1, j - 1],
          [i - 1, j],
          [i - 1, j + 1],
          [i, j - 1],
          [i, j + 1],
          [i + 1, j - 1],
          [i + 1, j],
          [i + 1, j + 1],
        ];
        const numbers: number[] = [];
        let count = 0;

        for (const neighboor of neighboorhood) {
          if (
            state[neighboor[0]] &&
            state[neighboor[0]][neighboor[1]] &&
            state[neighboor[0]][neighboor[1]].match(/\d/)
          ) {
            const number = scan(state[neighboor[0]], neighboor[1]);
            if (!numbers.includes(number)) {
              numbers.push(number);
              count++;
            }
          }
        }
        if (count === 2) {
          total += numbers.reduce((acc, next) => acc * next, 1);
        }
      }
    }
  }
  return total;
};

const expectedSecondSolution = 75805607;

export { first, expectedFirstSolution, second, expectedSecondSolution };
