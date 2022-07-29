import type { Board } from '@sudoku/core';

import type { SugokuDto } from '../dto/SugokuDto';

export const boardToSugokuDto = (b: Board): SugokuDto => {
  return {
    board: b
      .flat()
      .map(block => block.flat())
      .map(slots => slots.map(s => (s === '' ? 0 : s))),
  } as SugokuDto;
};
