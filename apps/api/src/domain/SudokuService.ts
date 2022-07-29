import type { Board, Difficulty } from '@sudoku/core';

import type { InternalError } from '../errors';

export interface SudokuService {
  createSudoku: (diff: Difficulty) => Promise<Board | InternalError>;
}
