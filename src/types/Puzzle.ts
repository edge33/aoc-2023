type Puzzle = {
  first: (input: string) => Promise<string>;
  expectedFirstSolution: string;
  second: (input: string) => Promise<string>;
  expectedSecondSolution: string;
};

export default Puzzle;
