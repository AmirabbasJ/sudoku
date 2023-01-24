import type { Static } from 'runtypes';
import { Record } from 'runtypes';

import { Board } from './Board';

export const SolveSudokuDto = Record({
  originalBoard: Board,
  currentBoard: Board,
});
export type SolveSudokuDto = Static<typeof SolveSudokuDto>;
