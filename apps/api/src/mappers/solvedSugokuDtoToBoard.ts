import type { Board } from '@sudoku/core';
import * as R from 'ramda';

import type { SolvedSugokuDto } from '../dto/SolvedSugokuDto';

export const solvedSugokuDtoToBoard = (b: SolvedSugokuDto): Board => {
  const flattenBoard = b.solution
    .map(block => block.map(s => (s === 0 ? '' : s)))
    .map(block => R.splitEvery(3, block));
  return R.splitEvery(3, flattenBoard) as Board;
};
