import type { Board } from '@sudoku/core';

export const isLoadingBoard = (b: Board) => b.flat(3).join('') === '';
