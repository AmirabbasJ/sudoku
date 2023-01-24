import type { Board } from '../core';

export const isEmptyBoard = (b: Board) => b.flat(3).join('') === '';
