import type { Board } from '@sudoku/core';

import type { SugokuDto } from '../dto/SugokuDto';
import { sugokuDtoToBoard } from './sugokuDtoToBoard';

describe('sugokuDtoToBoard', () => {
  it('should transform correctly', () => {
    const sample: SugokuDto = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 7, 0],
        [0, 2, 0, 4, 0, 0, 0, 6, 9],
        [7, 0, 0, 1, 5, 6, 0, 3, 4],
        [2, 0, 4, 5, 0, 7, 8, 0, 6],
        [0, 5, 0, 0, 9, 0, 0, 2, 0],
        [8, 0, 7, 2, 0, 0, 3, 0, 0],
        [5, 0, 1, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 9, 8, 0, 7, 0, 0],
        [9, 4, 0, 7, 0, 0, 6, 5, 2],
      ],
    };
    const expectedBoard: Board = [
      [
        [
          ['', '', ''],
          ['', '', ''],
          ['', 7, ''],
        ],
        [
          ['', 2, ''],
          [4, '', ''],
          ['', 6, 9],
        ],
        [
          [7, '', ''],
          [1, 5, 6],
          ['', 3, 4],
        ],
      ],
      [
        [
          [2, '', 4],
          [5, '', 7],
          [8, '', 6],
        ],
        [
          ['', 5, ''],
          ['', 9, ''],
          ['', 2, ''],
        ],
        [
          [8, '', 7],
          [2, '', ''],
          [3, '', ''],
        ],
      ],
      [
        [
          [5, '', 1],
          ['', '', ''],
          ['', '', ''],
        ],
        [
          [6, '', ''],
          [9, 8, ''],
          [7, '', ''],
        ],
        [
          [9, 4, ''],
          [7, '', ''],
          [6, 5, 2],
        ],
      ],
    ];
    expect(sugokuDtoToBoard(sample)).toStrictEqual(expectedBoard);
  });
});
