import { log } from 'console';

const first = (input: string) => {
  const [rules, points] = input.split('\n\n');
  const workflows = rules.split('\n').reduce(
    (a, line) => {
      const [name, rest_] = line.split('{');
      const rule = rest_.slice(0, rest_.length - 1);
      const splitRule = rule.split(',');
      a[name] = [[] as (string | number)[][], splitRule[splitRule.length - 1]];
      for (const currentRule of splitRule.slice(0, splitRule.length - 1)) {
        const [left, then] = currentRule.split(':');
        const operator = left[1];
        const number = left.split(operator)[1];
        a[name][0].push([left[0], operator, number, then]);
      }

      return a;
    },
    {} as { [key: string]: [(string | number)[][], string] }
  );

  const process = (
    rules: {
      [key: string]: [(string | number)[][], string];
    },
    shape: { [key: string]: number },
    ruleName = 'in'
  ): boolean => {
    if (ruleName === 'A') {
      return true;
    } else if (ruleName === 'R') {
      return false;
    }
    const rule = rules[ruleName];
    const [conditions, fallback] = rule;

    for (const [left, operator, right, then] of conditions) {
      if (eval(`${shape[left]} ${operator} ${right}`)) {
        return process(rules, shape, then as string);
      }
    }
    return process(rules, shape, fallback);
  };

  let total = 0;
  for (const line of points.split('\n')) {
    const shape = {} as { [key: string]: number };
    const shape_ = line.slice(1, line.length - 1);
    for (const entry of shape_.split(',')) {
      const [symbol, value] = entry.split('=');
      shape[symbol] = +value;
    }
    total += process(workflows, shape)
      ? Object.values(shape).reduce((a, n) => a + n, 0)
      : 0;
  }

  return total;
};

const expectedFirstSolution = 376008;

const second = (input: string) => {
  const [rules] = input.split('\n\n');
  const workflows = rules.split('\n').reduce(
    (a, line) => {
      const [name, rest_] = line.split('{');
      const rule = rest_.slice(0, rest_.length - 1);
      const splitRule = rule.split(',');
      a[name] = [[] as (string | number)[][], splitRule[splitRule.length - 1]];
      for (const currentRule of splitRule.slice(0, splitRule.length - 1)) {
        const [left, then] = currentRule.split(':');
        const operator = left[1];
        const number = left.split(operator)[1];
        a[name][0].push([left[0], operator, number, then]);
      }

      return a;
    },
    {} as { [key: string]: [(string | number)[][], string] }
  );

  const cloneObj = (obj: { [key: string]: number[] }) => {
    const newObj: { [key: string]: number[] } = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = value.slice();
    }
    return newObj;
  };

  const points = 'xmas'
    .split('')
    .reduce(
      (a, n) => ({ ...a, [n]: [1, 4000] }),
      {} as { [key: string]: number[] }
    );

  const count = (
    rules: { [key: string]: [(string | number)[][], string] },
    shape: { [key: string]: number[] },
    ruleName = 'in'
  ) => {
    if (ruleName === 'A') {
      return Object.values(shape).reduce((a, [lo, hi]) => a * (hi - lo + 1), 1);
    } else if (ruleName === 'R') {
      return 0;
    }

    const [conditions, fallback] = rules[ruleName];

    let total = 0;
    for (const [left, operator, right, then] of conditions) {
      const [lo, hi] = shape[left];
      if (operator === '<') {
        total += count(
          rules,
          { ...shape, [left]: [lo, +right - 1] },
          then as string
        );
        shape[left] = [+right, hi];
      } else if (operator === '>') {
        total += count(
          rules,
          { ...shape, [left]: [+right + 1, hi] },
          then as string
        );
        shape[left] = [lo, +right];
      } else {
        throw new Error(`unexpected operator: ${operator}`);
      }
    }

    total += count(rules, shape, fallback);
    return total;
  };

  return count(workflows, points);
};

const expectedSecondSolution = 124078207789312;

export { first, expectedFirstSolution, second, expectedSecondSolution };
