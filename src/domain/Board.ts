import * as R from 'ramda';

import type { Id } from './Id';
import { idToBoardIndex } from './Id';
import type { Slot } from './Slot';

export type Block = [[Slot, Slot, Slot], [Slot, Slot, Slot], [Slot, Slot, Slot]];
export type Board = [[Block, Block, Block], [Block, Block, Block], [Block, Block, Block]];

export const setBoard = (board: Board, id: Id, slot: Slot) => {
  const boardIndex = idToBoardIndex(id);
  return R.assocPath(boardIndex, slot, board);
};
