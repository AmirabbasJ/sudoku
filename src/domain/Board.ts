import * as R from 'ramda';

import type { Id } from './Id';
import { idToBoardIndex } from './Id';
import type { Slot, SlotState } from './Slot';
import { isValidNumericSlot } from './Slot';

export type Block = [[Slot, Slot, Slot], [Slot, Slot, Slot], [Slot, Slot, Slot]];
export type Board = [[Block, Block, Block], [Block, Block, Block], [Block, Block, Block]];

export const getSlot = (board: Board, id: Id): Slot => R.path(idToBoardIndex(id), board) as Slot;

const setSlot = (board: Board, id: Id, slot: Slot) => {
  const boardIndex = idToBoardIndex(id);
  return R.assocPath(boardIndex, slot, board);
};

export const editSlot = (board: Board, id: Id, slot: Slot): [Board, SlotState] => {
  const isValidSlot = slot === '' || isValidNumericSlot(board, id, slot);
  const newBoard = setSlot(board, id, slot);
  const state: SlotState = !isValidSlot ? 'mistake' : 'correct';
  return [newBoard, state];
};
