// Function to calculate the greatest common divisor (GCD)
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Function to calculate the least common multiple (LCM) of two numbers
const lcm = (a: number, b: number) => {
  return (a * b) / gcd(a, b);
};

// Function to calculate the LCM of an array of numbers
const arrayLCM = (numbers: number[]) => {
  if (numbers.length < 2) {
    // LCM is not defined for less than two numbers
    throw new Error('At least two numbers are required.');
  }

  // Reduce the array to find the LCM of all numbers
  return numbers.reduce((acc, num) => lcm(acc, num));
};

const parseInstructionsAndMap = (input: string) => {
  const [instructions, map_] = input.split('\n\n');
  const map = map_.split('\n').reduce((acc, next) => {
    const [start, directions] = next.split(' = ');
    const [, left, right] = directions.match(/\((\S+), (\S+)\)/);
    acc.set(start, [left, right]);

    return acc;
  }, new Map<string, string[]>());

  return { instructions, map };
};

const first = (input: string) => {
  const { instructions, map } = parseInstructionsAndMap(input);
  const end = 'ZZZ';
  const start = 'AAA';
  let step = start;
  let instructionIndex = 0;
  let count = 0;
  while (step !== end) {
    const nextStep = map.get(step);
    const direction = instructions[instructionIndex];
    instructionIndex = (instructionIndex + 1) % instructions.length;
    step = nextStep[direction === 'L' ? 0 : 1];
    count++;
  }
  return count;
};

const expectedFirstSolution = 19199;

const second = (input: string) => {
  const { instructions, map } = parseInstructionsAndMap(input);

  return arrayLCM(
    [...map.keys()]
      .filter((key) => key.endsWith('A'))
      .reduce((acc, next) => {
        let step = next;
        let instructionIndex = 0;
        let count = 0;
        while (!step.endsWith('Z')) {
          const nextStep = map.get(step);
          const direction = instructions[instructionIndex];
          instructionIndex = (instructionIndex + 1) % instructions.length;
          step = nextStep[direction === 'L' ? 0 : 1];
          count++;
        }
        acc.push(count);

        return acc;
      }, [])
  );
};

const expectedSecondSolution = 13663968099527;

export { first, expectedFirstSolution, second, expectedSecondSolution };
