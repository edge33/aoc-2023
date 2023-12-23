const overlaps = (a: number[], b: number[]) => {
  return (
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) &&
    Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  );
};

const first = (input: string) => {
  let bricks = input
    .split('\n')
    .map((l) => l.replace('~', ',').split(',').map(Number))
    .sort(([, , z], [, , z2]) => (z <= z2 ? -1 : 1));

  // simulate bricks falling
  for (let i = 0; i < bricks.length; i++) {
    let maxZ = 1;
    const brick = bricks[i];
    for (let j = 0; j < i; j++) {
      const check = bricks[j];
      if (overlaps(brick, check)) {
        maxZ = Math.max(maxZ, check[5] + 1);
      }
    }
    brick[5] -= brick[2] - maxZ;
    brick[2] = maxZ;
  }

  bricks = bricks.sort(([, , z], [, , z2]) => (z <= z2 ? -1 : 1));

  const kSupportsV = bricks.reduce(
    (a, n, i) => ({ ...a, [`${i}`]: new Set<number>() }),
    {} as { [key: string]: Set<number> }
  );

  const vSupportsK = bricks.reduce(
    (a, n, i) => ({ ...a, [`${i}`]: new Set<number>() }),
    {} as { [key: string]: Set<number> }
  );

  for (const [j, upper] of bricks.entries()) {
    for (const [i, lower] of [...bricks.entries()].slice(0, j)) {
      if (overlaps(lower, upper) && upper[2] === lower[5] + 1) {
        kSupportsV[i].add(j);
        vSupportsK[j].add(i);
      }
    }
  }

  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    if ([...kSupportsV[i].values()].every((j) => vSupportsK[j].size >= 2)) {
      total++;
    }
  }

  return total;
};

const expectedFirstSolution = 443;

const second = (input: string) => {
  let bricks = input
    .split('\n')
    .map((l) => l.replace('~', ',').split(',').map(Number))
    .sort(([, , z], [, , z2]) => (z <= z2 ? -1 : 1));

  // simulate bricks falling
  for (let i = 0; i < bricks.length; i++) {
    let maxZ = 1;
    const brick = bricks[i];
    for (let j = 0; j < i; j++) {
      const check = bricks[j];
      if (overlaps(brick, check)) {
        maxZ = Math.max(maxZ, check[5] + 1);
      }
    }
    brick[5] -= brick[2] - maxZ;
    brick[2] = maxZ;
  }

  bricks = bricks.sort(([, , z], [, , z2]) => (z <= z2 ? -1 : 1));

  const kSupportsV = bricks.reduce(
    (a, n, i) => ({ ...a, [`${i}`]: new Set<number>() }),
    {} as { [key: string]: Set<number> }
  );

  const vSupportsK = bricks.reduce(
    (a, n, i) => ({ ...a, [`${i}`]: new Set<number>() }),
    {} as { [key: string]: Set<number> }
  );

  for (const [j, upper] of bricks.entries()) {
    for (const [i, lower] of [...bricks.entries()].slice(0, j)) {
      if (overlaps(lower, upper) && upper[2] === lower[5] + 1) {
        kSupportsV[i].add(j);
        vSupportsK[j].add(i);
      }
    }
  }

  let total = 0;

  for (let i = 0; i < bricks.length; i++) {
    const q = [...kSupportsV[i].values()].filter(
      (j) => vSupportsK[j].size === 1
    );
    const falling = new Set<number>(q);
    falling.add(i);
    while (q.length) {
      const j = q.shift();
      for (const k of kSupportsV[j]) {
        if (falling.has(k)) {
          continue;
        }
        if ([...vSupportsK[k].values()].every((v) => falling.has(v))) {
          q.push(k);
          falling.add(k);
        }
      }
    }
    total += falling.size - 1;
  }

  return total;
};

const expectedSecondSolution = 69915;

export { first, expectedFirstSolution, second, expectedSecondSolution };
