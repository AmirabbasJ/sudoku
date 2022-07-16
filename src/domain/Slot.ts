import * as R from 'ramda';

import type { Board } from './Board';
import type { Id } from './Id';
import { idToBoardIndex } from './Id';

export type NumericSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EmptySlot = '';
export type Slot = EmptySlot | NumericSlot;
export type SlotState = 'correct' | 'mistake';

export const parseSlot = (x: string): Slot | null =>
  /^(Backspace)|(Delete)$/.test(x) ? '' : /^([1-9]{1})$/.test(x) ? (Number.parseInt(x, 10) as NumericSlot) : null;

const isNotInBlock = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const [blockRow, blockCol] = idToBoardIndex(id);
  const block = board[blockRow]![blockCol]!;
  const blockSlots = block.flat();
  return !blockSlots.includes(slot);
};

const isNotInRow = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const [blockRow, _, slotRow] = idToBoardIndex(id);
  const rowSlots = R.pluck(slotRow, board[blockRow]!).flat();
  return !rowSlots.includes(slot);
};
const isNotInCol = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const [_, blockCol, __, slotCol] = idToBoardIndex(id);
  const colSlots = R.pluck(slotCol, R.pluck(blockCol, board).flat());
  return !colSlots.includes(slot);
};

export const isValidNumericSlot = R.allPass([isNotInRow, isNotInBlock, isNotInCol]);
