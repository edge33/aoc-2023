import type Puzzle from './types/Puzzle.js';
import readFile from './utils/readFile.js';

const args = process.argv.slice(2);
const dayToSolve = args[0];

if (!dayToSolve) {
  console.error('No day specified run with npm run dev {day}');
  process.exit(1);
}

console.log(`Solving Day #${args[0]}`);
(async () => {
  let input = '';
  const puzzleName = args[0];
  try {
    const puzzlePath = `src/days/${puzzleName}`;
    input = await readFile(`${puzzlePath}/input.txt`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  const { first, second }: Puzzle = await import(
    `./days/${puzzleName}/Puzzle.js`
  );

  let start = performance.now();
  console.log(await first(input));
  let end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
  start = performance.now();
  console.log(await second(input));
  end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
})();
