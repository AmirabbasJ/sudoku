import type { Board, Difficulty } from '@sudoku/core';
import { UnfilledSlot } from '@sudoku/core';
import * as R from 'ramda';
import { getSudoku } from 'sudoku-gen';

export const parseSudoku = (x: string): Board => {
  return R.pipe(
    R.splitEvery(27),
    R.map(R.splitEvery(3)),
    R.map(R.splitEvery(3)),
    R.map(R.transpose) as any,
    R.map(
      R.map(
        R.map(
          R.pipe(
            R.split(''),
            R.map(m =>
              m === '-'
                ? UnfilledSlot
                : { value: Number.parseInt(m, 10), state: 'prefilled' },
            ),
          ),
        ),
      ),
    ),
  )(x as any) as Board;
};

export const createSudoku = (
  diff: Difficulty,
): { board: Board; solved: Board } => {
  const { puzzle, solution } = getSudoku(diff);
  return { board: parseSudoku(puzzle), solved: parseSudoku(solution) };
};
