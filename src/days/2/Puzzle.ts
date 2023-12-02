const isPossible = (
  allowance_: { [key: string]: number },
  rounds: { [key: string]: number }[]
) => {
  for (const round of rounds) {
    const allowance = { ...allowance_ };
    for (const key of Object.keys(round)) {
      if (round[key] > allowance[key]) {
        return false;
      }
    }
  }

  return true;
};

const getGames = (input: string) =>
  input.split('\n').map((l) =>
    l
      .split(': ')[1]
      .split(';')
      .reduce((acc, next) => {
        const matches = next.match(/(\d+) (\w+)/g);
        const cubes = matches.map((rule) => rule.split(' '));
        acc.push(
          cubes.reduce(
            (acc, next) => {
              acc[next[1]] = +next[0];
              return acc;
            },
            {} as { [key: string]: number }
          )
        );
        return acc;
      }, [])
  );

const first = (input: string) => {
  const allowance = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = getGames(input);

  let total = 0;
  for (let i = 0; i < games.length; i++) {
    total += isPossible(allowance, games[i]) ? i + 1 : 0;
  }

  return total;
};

const expectedFirstSolution = 2317;

const second = (input: string) => {
  const games = getGames(input);

  return games.reduce((acc, game) => {
    const maximumValues = game.reduce<{ [key: string]: number }>(
      (a, round) => {
        for (const key of Object.keys(round)) {
          if (!a[key]) {
            a[key] = round[key];
          } else if (round[key] > a[key]) {
            a[key] = round[key];
          }
        }
        return a;
      },
      {} as { [key: string]: number }
    );

    return acc + Object.values(maximumValues).reduce((a, n) => a * n, 1);
  }, 0);
};

const expectedSecondSolution = 74804;

export { first, expectedFirstSolution, second, expectedSecondSolution };
