// import { writeFile } from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

/**
 * fht -> vtt
 * czs -> tdk
 * kbr -> bbg
 */

const first = (input: string) => {
  const links = ['from,to'];
  const nodes = new Set<string>();
  const linksMap: { [key: string]: string[] } = {};

  input.split('\n').map((l) => {
    const [from, to] = l.split(': ');
    let destinations = to.split(' ');
    nodes.add(from);

    if (from === 'vtt' && destinations.includes('fht')) {
      destinations = destinations.filter((d) => d !== 'fht');
    } else if (from === 'czs' && destinations.includes('tdk')) {
      destinations = destinations.filter((d) => d !== 'tdk');
    } else if (from === 'bbg' && destinations.includes('kbr')) {
      destinations = destinations.filter((d) => d !== 'kbr');
    }

    // THESE ARE FOR THE TEST INPUT
    // if (from === 'pzl' && destinations.includes('hfx')) {
    //   destinations = destinations.filter((d) => d !== 'hfx');
    // } else if (from === 'cmg' && destinations.includes('bvb')) {
    //   destinations = destinations.filter((d) => d !== 'bvb');
    // } else if (from === 'jqt' && destinations.includes('nvd')) {
    //   destinations = destinations.filter((d) => d !== 'nvd');
    // }

    for (const next of destinations) {
      nodes.add(next);
      linksMap[from] ??= [];
      linksMap[from].push(next);
      linksMap[next] ??= [];
      linksMap[next].push(from);
      links.push(`${from}, ${next}`);
    }
  });

  /**
   * feed the output csv files into https://app.flourish.studio/
   * network graph visualization
   * and figure out what links to remove
   * in my case
   * fht -> vtt
   * czs -> tdk
   * kbr -> bbg
   */

  // writeFile(
  //   `${path.dirname(fileURLToPath(import.meta.url))}/nodes.csv`,
  //   ['nodes', [...nodes.values()].join('\n')].join('\n'),
  //   (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   }
  // );

  // writeFile(
  //   `${path.dirname(fileURLToPath(import.meta.url))}/links.csv`,
  //   links.join('\n'),
  //   (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   }
  // );

  const getGraphSize = (
    startNode: string,
    linksMap: { [key: string]: string[] }
  ) => {
    const q = [startNode];
    const visited = new Set<string>();
    while (q.length) {
      const current = q.shift();

      visited.add(current);

      for (const next of linksMap[current]) {
        if (!visited.has(next)) {
          q.push(next);
        }
      }
    }
    return visited.size;
  };

  return getGraphSize('fht', linksMap) * getGraphSize('vtt', linksMap);
};

const expectedFirstSolution = 507626;

const second = (input: string) => {
  return 'Merry Christmas';
};

const expectedSecondSolution = 'Merry Christmas';

export { first, expectedFirstSolution, second, expectedSecondSolution };
