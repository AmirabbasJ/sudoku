import type { Board, Difficulty } from '@sudoku/core';

const solvedEasyBoard: Board = [
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [4, 5, 6],
      [7, 8, 9],
      [1, 2, 3],
    ],
    [
      [7, 8, 9],
      [1, 2, 3],
      [4, 5, 6],
    ],
  ],
  [
    [
      [2, 1, 4],
      [3, 6, 5],
      [8, 9, 7],
    ],
    [
      [3, 6, 5],
      [8, 9, 7],
      [2, 1, 4],
    ],
    [
      [8, 9, 7],
      [2, 1, 4],
      [3, 6, 5],
    ],
  ],
  [
    [
      [5, 3, 1],
      [6, 4, 2],
      [9, 7, 8],
    ],
    [
      [6, 4, 2],
      [9, 7, 8],
      [5, 3, 1],
    ],
    [
      [9, 7, 8],
      [5, 3, 1],
      [6, 4, 2],
    ],
  ],
];

const solvedMediumBoard: Board = [
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [4, 5, 6],
      [7, 8, 9],
      [1, 2, 3],
    ],
    [
      [7, 8, 9],
      [1, 2, 3],
      [4, 5, 6],
    ],
  ],
  [
    [
      [2, 1, 4],
      [3, 6, 5],
      [8, 9, 7],
    ],
    [
      [3, 6, 5],
      [8, 9, 7],
      [2, 1, 4],
    ],
    [
      [8, 9, 7],
      [2, 1, 4],
      [3, 6, 5],
    ],
  ],
  [
    [
      [5, 3, 1],
      [6, 4, 2],
      [9, 7, 8],
    ],
    [
      [6, 4, 2],
      [9, 7, 8],
      [5, 3, 1],
    ],
    [
      [9, 7, 8],
      [5, 3, 1],
      [6, 4, 2],
    ],
  ],
];

const solvedHardBoard: Board = [
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [4, 5, 6],
      [7, 8, 9],
      [1, 2, 3],
    ],
    [
      [7, 8, 9],
      [1, 2, 3],
      [4, 5, 6],
    ],
  ],
  [
    [
      [2, 1, 4],
      [3, 6, 5],
      [8, 9, 7],
    ],
    [
      [3, 6, 5],
      [8, 9, 7],
      [2, 1, 4],
    ],
    [
      [8, 9, 7],
      [2, 1, 4],
      [3, 6, 5],
    ],
  ],
  [
    [
      [5, 3, 1],
      [6, 4, 2],
      [9, 7, 8],
    ],
    [
      [6, 4, 2],
      [9, 7, 8],
      [5, 3, 1],
    ],
    [
      [9, 7, 8],
      [5, 3, 1],
      [6, 4, 2],
    ],
  ],
];

export const getSolvedSamples = (diff: Difficulty) =>
  diff === 'easy'
    ? solvedEasyBoard
    : diff === 'medium'
    ? solvedMediumBoard
    : solvedHardBoard;