const mapTotarget = (map: number[][], source: number) => {
  for (const [target, start, delta] of map) {
    if (source >= start && source <= start + delta) {
      return target + (source - start);
    }
  }
  return source;
};

const buildMapsAndSeeds = (input: string) => {
  const parts = input.split('\n\n');
  const seeds = parts[0]
    .split(':')[1]
    .split('\n')[0]
    .trim()
    .split(' ')
    .map((n) => +n);

  const maps = parts.slice(1).map((l) =>
    l
      .split(':')[1]
      .split('\n')
      .slice(1)
      .map((r) =>
        r
          .trim()
          .split(' ')
          .map((n) => +n)
      )
  );

  return { seeds, maps };
};

const first = (input: string) => {
  const { seeds: seeds_, maps } = buildMapsAndSeeds(input);

  let seeds = seeds_;
  for (const map of maps) {
    const newSeeds = [];
    for (const seed of seeds) {
      newSeeds.push(mapTotarget(map, seed));
    }
    seeds = newSeeds;
  }

  return Math.min(...seeds);
};

const expectedFirstSolution = 535088217;

const second = (input: string) => {
  const { maps, seeds } = buildMapsAndSeeds(input);

  let pairs: number[][] = [];

  for (let i = 0; i < seeds.length - 1; i += 2) {
    const start = seeds[i];
    const range = seeds[i + 1];
    pairs.push([start, start + range]);
  }

  for (const map of maps) {
    const newPairs = [];
    while (pairs.length) {
      const [s, e] = pairs.pop();

      let broken = false;
      for (const [a, b, c] of map) {
        const overlapStart = Math.max(s, b);
        const overlapEnd = Math.min(e, b + c);

        if (overlapStart < overlapEnd) {
          newPairs.push([overlapStart - b + a, overlapEnd - b + a]);
          if (overlapStart > s) {
            pairs.push([s, overlapStart]);
          }
          if (e > overlapEnd) {
            pairs.push([overlapEnd, e]);
          }
          broken = true;
          break;
        }
      }
      if (!broken) {
        newPairs.push([s, e]);
      }
    }

    pairs = newPairs;
  }
  const min = pairs.reduce(
    (acc, next) => (next[0] <= acc || acc === -1 ? next[0] : acc),
    -1
  );
  return min;
};

const expectedSecondSolution = 51399228;

export { first, expectedFirstSolution, second, expectedSecondSolution };
