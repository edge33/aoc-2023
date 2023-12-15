const hash = (value: string) =>
  value.split('').reduce((acc, next) => {
    let newAcc = acc;
    newAcc += next.charCodeAt(0);
    newAcc *= 17;
    newAcc %= 256;
    return newAcc;
  }, 0);

const first = (input: string) => {
  return input.split(',').reduce((acc, next) => acc + hash(next), 0);
};

const expectedFirstSolution = 501680;

const second = (input: string) => {
  const hashmap = new Array<string[]>(256).fill([]).map((_) => []);
  const lengths: { [key: string]: number } = {};

  input.split(',').map((instruction) => {
    if (instruction.includes('-')) {
      const label = instruction.slice(0, instruction.length - 1);

      const index = hash(label);
      const instructionIndex = hashmap[index].findIndex((v) => v === label);
      if (instructionIndex !== -1) {
        hashmap[index].splice(instructionIndex, 1);
      }
    } else if (instruction.includes('=')) {
      const label = instruction.slice(0, instruction.length - 2);
      const index = hash(label);
      const instructionIndex = hashmap[index].findIndex((v) => v === label);

      if (instructionIndex !== -1) {
        hashmap[index].splice(instructionIndex, 1, label);
      } else {
        hashmap[index].push(label);
      }

      lengths[label] = +instruction.slice(instruction.length - 1);
    }
  });

  return hashmap.reduce(
    (acc, bucket, bi) =>
      acc +
      bucket.reduce(
        (a, lens, li) => a + (bi + 1) * (li + 1) * lengths[lens],
        0
      ),
    0
  );
};

const expectedSecondSolution = 241094;

export { first, expectedFirstSolution, second, expectedSecondSolution };
