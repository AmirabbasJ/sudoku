import type { Board } from '@sudoku/core';
import * as R from 'ramda';

import type { SugokuDto } from '../dto/SugokuDto';

export const sugokuDtoToBoard = (b: SugokuDto): Board => {
  const flattenBoard = b.board
    .map(block => block.map(s => (s === 0 ? '' : s)))
    .map(block => R.splitEvery(3, block));
  return R.splitEvery(3, flattenBoard) as Board;
};
