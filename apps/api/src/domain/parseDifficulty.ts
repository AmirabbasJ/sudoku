import type { Difficulty } from '@sudoku/core';

export const parseDifficulty = (x: string): Difficulty | null =>
  x === 'easy' || x === 'medium' || x === 'hard' ? x : null;
