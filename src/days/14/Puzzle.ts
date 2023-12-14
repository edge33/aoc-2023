const tiltNorth = (lines: string[][]) => {
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][j] != 'O') {
        continue;
      }

      let position = i - 1;
      while (position >= 0 && lines[position][j] == '.') {
        position--;
      }

      if (position < i - 1) {
        lines[position + 1][j] = 'O';
        lines[i][j] = '.';
      }
    }
  }
};

const tiltSouth = (lines: string[][]) => {
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i][j] != 'O') {
        continue;
      }

      let position = i + 1;
      while (position < lines.length && lines[position][j] == '.') {
        position++;
      }

      if (position > i + 1) {
        lines[position - 1][j] = 'O';
        lines[i][j] = '.';
      }
    }
  }
};

const tiltWest = (lines: string[][]) => {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] != 'O') {
        continue;
      }

      let position = j - 1;
      while (position >= 0 && lines[i][position] == '.') {
        position--;
      }

      if (position < j - 1) {
        lines[i][position + 1] = 'O';
        lines[i][j] = '.';
      }
    }
  }
};

const tiltEast = (lines: string[][]) => {
  for (let i = 0; i < lines.length; i++) {
    for (let j = lines[0].length - 1; j >= 0; j--) {
      if (lines[i][j] != 'O') {
        continue;
      }

      let position = j + 1;
      while (position < lines[0].length && lines[i][position] == '.') {
        position++;
      }

      if (position > j + 1) {
        lines[i][position - 1] = 'O';
        lines[i][j] = '.';
      }
    }
  }
};

const seenArrangements: { [key: string]: number } = {};
function valueExistsInObject(value: string): boolean {
  return Object.keys(seenArrangements).includes(value);
}

function cycle(lines: string[][]) {
  tiltNorth(lines);
  tiltWest(lines);
  tiltSouth(lines);
  tiltEast(lines);
}

const first = (input: string) => {
  const lines = input.split('\n').map((l) => l.split(''));
  const state = lines
    .map((subArray) => subArray.join(' ')) // Join each sub-array into a string
    .join(' '); // Join the resulting strings into a single string

  tiltNorth(lines);
  let sum = 0;
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][j] != 'O') {
        continue;
      }

      sum += lines.length - i;
    }
  }
  return sum;
};

const expectedFirstSolution = 106997;

const second = (input: string) => {
  const lines = input.split('\n').map((l) => l.split(''));
  let state = lines
    .map((subArray) => subArray.join(' ')) // Join each sub-array into a string
    .join(' '); // Join the resulting strings into a single string

  let index = 0;
  const totalCycles = 1000000000;
  while (!valueExistsInObject(state) && index < totalCycles) {
    seenArrangements[state] = index;
    index++;
    cycle(lines);
    state = lines
      .map((subArray) => subArray.join(' ')) // Join each sub-array into a string
      .join(' '); // Join the resulting strings into a single string
  }

  const cycleStart = seenArrangements[state];
  const cycleEnd = index;
  const remainingCycles = (totalCycles - cycleStart) % (cycleEnd - cycleStart);

  for (let i = 0; i < remainingCycles; i++) {
    cycle(lines);
  }

  let sum = 0;

  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][j] != 'O') {
        continue;
      }

      sum += lines.length - i;
    }
  }

  return sum;
};

const expectedSecondSolution = 99641;

export { first, expectedFirstSolution, second, expectedSecondSolution };
