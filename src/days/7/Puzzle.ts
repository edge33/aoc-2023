enum TYPE {
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_A_KIND,
  FULL_HOUSE,
  FOUR_A_KIND,
  FIVE_A_KIND,
}

/**
 * check scores return the type of point scored
 * high card: 1,
 * pair: 2,
 * two pair: 3
 * three of a kind: 4
 * full house: 5
 * four of a kind: 6
 * five of a kind: 7
 */

const computeScore = (hand: string, useJacks: boolean) => {
  const scores = hand.split('').reduce(
    (acc, next) => {
      if (acc[next]) {
        acc[next] += 1;
      } else {
        acc[next] = 1;
      }
      return acc;
    },
    {} as { [key: string]: number }
  );

  /**
   * check sums of scores
   * = 1 -> highcard -> 0
   * = 2 -> pair -> 1
   * = 3 -> three of a kind -> 3
   * = 5 -> full house with two cards -> 4
   * = 4 -> two pair if three cards -> 2
   * = 4 -> four of a kind with two cards -> 5
   * = 5 -> five of a kind with one card -> 6
   */

  const score = Object.keys(scores).reduce((acc, next) => {
    return scores[next] > 1 ? acc + scores[next] : acc;
  }, 0);
  const cards = Object.keys(scores).length;

  let handScore = 0;
  switch (score) {
    case 0: {
      // highcard
      handScore = TYPE.HIGH_CARD;

      if (useJacks) {
        // with one jack -> pair
        // with two jack -> three
        // with three jack -> four of a kind
        // with four jacks -> five of a kind
        if (scores['J'] === 1) {
          handScore = TYPE.PAIR;
          break;
        }
      }

      break;
    }
    case 2: {
      // pair
      handScore = TYPE.PAIR;

      if (useJacks) {
        // with one jack -> three
        // with two jack -> three
        // with three jack -> five of a kind

        if (scores['J'] === 1) {
          handScore = TYPE.THREE_A_KIND;
          break;
        }
        if (scores['J'] === 2) {
          handScore = TYPE.THREE_A_KIND;
          break;
        }
        // if (scores['J'] === 3) {
        //   handScore = TYPE.FIVE_A_KIND;
        //   break;
        // }
      }
      break;
    }
    case 3: {
      // three of a kind
      handScore = TYPE.THREE_A_KIND;

      if (useJacks) {
        // with one jack -> four of a kind
        // with two jack -> five of a kind
        // with three jack -> four of a kind
        if (scores['J'] === 1) {
          handScore = TYPE.FOUR_A_KIND;
          break;
        }
        if (scores['J'] === 2) {
          handScore = TYPE.FIVE_A_KIND;
          break;
        }
        if (scores['J'] === 3) {
          handScore = TYPE.FOUR_A_KIND;
          break;
        }
      }
      break;
    }
    case 4: {
      if (cards === 3) {
        // two pairs
        handScore = TYPE.TWO_PAIR;
        if (useJacks) {
          // with on jack -> full
          // with two jack -> four of a kind
          if (scores['J'] === 1) {
            handScore = TYPE.FULL_HOUSE;
            break;
          }
          if (scores['J'] === 2) {
            handScore = TYPE.FOUR_A_KIND;
            break;
          }
        }
        break;
      }
      // four of a kind
      handScore = TYPE.FOUR_A_KIND;
      if (useJacks) {
        // with one jack -> five of a kind
        if (scores['J']) {
          handScore = TYPE.FIVE_A_KIND;
        }
      }
      break;
    }
    case 5: {
      if (cards === 2) {
        // full house
        handScore = TYPE.FULL_HOUSE;
        if (useJacks) {
          // with two or three jacks -> five of a kind
          if (scores['J']) {
            handScore = TYPE.FIVE_A_KIND;
            break;
          }
        }
        break;
      }
      // five of a kind
      handScore = TYPE.FIVE_A_KIND;
      break;
    }
  }

  return handScore;
};

const first = (input: string) => {
  const hands = input.split('\n').map((l) => l.split(' '));
  const cardsValue: { [key: string]: number } = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const scores: [string, string][][] = [[], [], [], [], [], [], [], []];

  for (const [hand, bet] of hands) {
    const score = computeScore(hand, false);
    scores[score] = [...scores[score], [bet, hand]];
  }

  let index = 1;
  return scores.reduce(
    (acc, next) =>
      acc +
      next
        .sort(([, a], [, b]) => {
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              return cardsValue[a[i]] > cardsValue[b[i]] ? 1 : -1;
            }
          }
        })
        .reduce((a, n) => a + +n[0] * index++, 0),
    0
  );
};

const expectedFirstSolution = 248105065;

const second = (input: string) => {
  const hands = input.split('\n').map((l) => l.split(' '));

  const scores: [string, string][][] = [[], [], [], [], [], [], [], []];
  for (const [hand, bet] of hands) {
    const score = computeScore(hand, true);
    scores[score] = [...scores[score], [bet, hand]];
  }

  const cardsValue: { [key: string]: number } = {
    J: 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    T: 10,
    Q: 11,
    K: 12,
    A: 13,
  };

  let index = 1;
  return scores.reduce(
    (acc, next) =>
      acc +
      next
        .sort(([, a], [, b]) => {
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              return cardsValue[a[i]] > cardsValue[b[i]] ? 1 : -1;
            }
          }
        })
        .reduce((a, n) => a + +n[0] * index++, 0),
    0
  );
};

const expectedSecondSolution = 249515436;

export { first, expectedFirstSolution, second, expectedSecondSolution };
