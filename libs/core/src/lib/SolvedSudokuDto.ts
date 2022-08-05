import type { Static } from 'runtypes';
import { Boolean, Record } from 'runtypes';

export const SolvedSudokuDto = Record({ isCorrect: Boolean });
export type SolvedSudokuDto = Static<typeof SolvedSudokuDto>;
