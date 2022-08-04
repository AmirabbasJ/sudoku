import type { Board } from '@sudoku/core';

export const isEmptyBoard = (b: Board) => b.flat(3).join('') === '';
