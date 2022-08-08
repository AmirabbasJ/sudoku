import type { Board, Difficulty } from '@sudoku/core';
import { getSampleBoard, getSolvedSamples } from '@sudoku/core';
import { equals } from 'ramda';

import type { SudokuService } from '../src/domain';
import { toInt } from '../src/helpers';
import { App } from '../src/infra/server/App';

class SudokuServiceMock implements SudokuService {
  createSudoku = (diff: Difficulty): Promise<Board | 'InternalError'> =>
    Promise.resolve(getSampleBoard(diff));

  solveSudoku = (board: Board): Promise<Board | 'InternalError'> => {
    const diff = equals(board, getSampleBoard('easy'))
      ? 'easy'
      : equals(board, getSampleBoard('medium'))
      ? 'medium'
      : 'hard';
    return Promise.resolve(getSolvedSamples(diff));
  };
}

export const MockApp = new App(
  { port: toInt(process.env['PORT'] as string) },
  new SudokuServiceMock(),
);
