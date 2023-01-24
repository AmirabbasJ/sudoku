import * as R from 'ramda';
import { Literal, Tuple, Union } from 'runtypes';

import type { Id } from './Id';
import { idToBoardIndex } from './Id';
import type { Slot } from './Slot';

export type Block = [
  [Slot, Slot, Slot],
  [Slot, Slot, Slot],
  [Slot, Slot, Slot],
];
export type Board = [
  [Block, Block, Block],
  [Block, Block, Block],
  [Block, Block, Block],
];

export const setBoard = (board: Board, id: Id, slot: Slot) => {
  const boardIndex = idToBoardIndex(id);
  return R.assocPath(boardIndex, slot, board);
};

const SlotT = Union(
  Literal(1),
  Literal(2),
  Literal(3),
  Literal(4),
  Literal(5),
  Literal(6),
  Literal(7),
  Literal(8),
  Literal(9),
  Literal(''),
);
const Block = Tuple(
  Tuple(SlotT, SlotT, SlotT),
  Tuple(SlotT, SlotT, SlotT),
  Tuple(SlotT, SlotT, SlotT),
);
export const Board = Tuple(
  Tuple(Block, Block, Block),
  Tuple(Block, Block, Block),
  Tuple(Block, Block, Block),
);
