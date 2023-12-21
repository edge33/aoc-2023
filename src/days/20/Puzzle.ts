const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

type ConjunctionMemory = { [key: string]: string };
type FlipFlopMemory = 'on' | 'off';

type Module = {
  name: string;
  type: string;
  memory: FlipFlopMemory | ConjunctionMemory;
  outputs: string[];
};

const first = (input: string) => {
  let broadcastTargets: string[] = [];
  const modules = input.split('\n').reduce(
    (a, l) => {
      const [left, right] = l.split(' -> ');
      const outputs = right.split(', ');

      if (left === 'broadcaster') {
        broadcastTargets = outputs;
      } else {
        const type = left[0];
        const name = left.slice(1);
        a[name] = { name, type, outputs, memory: type === '%' ? 'off' : {} };
      }
      return a;
    },
    {} as { [key: string]: Module }
  );

  for (const [name, module] of Object.entries(modules)) {
    for (const output of module.outputs) {
      if (modules[output] && modules[output].type === '&') {
        (modules[output].memory as ConjunctionMemory)[name] = 'lo';
      }
    }
  }

  let his = 0;
  let los = 0;
  for (let i = 0; i < 1000; i++) {
    los += 1;
    const q = broadcastTargets.reduce(
      (acc, next) => [...acc, ['broadcaster', next, 'lo']],
      []
    );
    while (q.length) {
      const [origin, target, pulse] = q.splice(0, 1)[0];
      if (pulse === 'lo') {
        los += 1;
      } else {
        his += 1;
      }

      if (!modules[target]) {
        continue;
      }

      const module = modules[target];
      if (module.type === '%') {
        if (pulse === 'lo') {
          module.memory = module.memory === 'off' ? 'on' : 'off';
          const outgoing = module.memory === 'on' ? 'hi' : 'lo';
          for (const currentOutput of module.outputs) {
            q.push([module.name, currentOutput, outgoing]);
          }
        }
      } else if (module.type === '&') {
        (module.memory as ConjunctionMemory)[origin] = pulse;

        const outgoing = [...Object.values(module.memory)].every(
          (pulse) => pulse === 'hi'
        )
          ? 'lo'
          : 'hi';
        for (const currentOutput of module.outputs) {
          q.push([module.name, currentOutput, outgoing]);
        }
      }
    }
  }

  return his * los;
};

const expectedFirstSolution = 684125385;

const second = (input: string) => {
  let broadcastTargets: string[] = [];
  const modules = input.split('\n').reduce(
    (a, l) => {
      const [left, right] = l.split(' -> ');
      const outputs = right.split(', ');

      if (left === 'broadcaster') {
        broadcastTargets = outputs;
      } else {
        const type = left[0];
        const name = left.slice(1);
        a[name] = { name, type, outputs, memory: type === '%' ? 'off' : {} };
      }
      return a;
    },
    {} as { [key: string]: Module }
  );

  for (const [name, module] of Object.entries(modules)) {
    for (const output of module.outputs) {
      if (modules[output] && modules[output].type === '&') {
        (modules[output].memory as ConjunctionMemory)[name] = 'lo';
      }
    }
  }

  const [feed] = Object.entries(modules).reduce(
    (acc, [name, module]) =>
      module.outputs.includes('rx') ? [...acc, name] : acc,
    []
  );

  const cycleLengths: { [key: string]: number } = {};

  const seen: { [key: string]: number } = Object.entries(modules).reduce(
    (acc, [name, module]) =>
      module.outputs.includes(feed) ? { ...acc, [name]: 0 } : acc,
    {}
  );

  let presses = 0;
  while (true) {
    presses++;
    const q = broadcastTargets.reduce(
      (acc, next) => [...acc, ['broadcaster', next, 'lo']],
      []
    );
    while (q.length) {
      const [origin, target, pulse] = q.splice(0, 1)[0];

      if (!modules[target]) {
        continue;
      }
      const module = modules[target];

      if (module.name === feed && pulse === 'hi') {
        seen[origin] += 1;

        if (!cycleLengths[origin]) {
          cycleLengths[origin] = presses;
        } else {
          if (presses !== seen[origin] * cycleLengths[origin]) {
            throw new Error(`unexpected cycle length for ${origin}`);
          }
        }

        if (Object.values(seen).every((v) => v > 10)) {
          return lcm(...[...Object.values(cycleLengths)]);
        }
      }

      if (module.type === '%') {
        if (pulse === 'lo') {
          module.memory = module.memory === 'off' ? 'on' : 'off';
          const outgoing = module.memory === 'on' ? 'hi' : 'lo';
          for (const currentOutput of module.outputs) {
            q.push([module.name, currentOutput, outgoing]);
          }
        }
      } else if (module.type === '&') {
        (module.memory as ConjunctionMemory)[origin] = pulse;

        const outgoing = [...Object.values(module.memory)].every(
          (pulse) => pulse === 'hi'
        )
          ? 'lo'
          : 'hi';
        for (const currentOutput of module.outputs) {
          q.push([module.name, currentOutput, outgoing]);
        }
      }
    }
  }
};

const expectedSecondSolution = 225872806380073;

export { first, expectedFirstSolution, second, expectedSecondSolution };
