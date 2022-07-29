import type { Board } from '@sudoku/core';
import * as R from 'ramda';

import type { BoardDto } from '../dto/BoardDto';

export const boardDtoToBoard = (b: BoardDto): Board => {
  const flattenBoard = b
    .map(block => block.map(s => (s === 0 ? '' : s)))
    .map(block => R.splitEvery(3, block));
  return R.splitEvery(3, flattenBoard) as Board;
};
