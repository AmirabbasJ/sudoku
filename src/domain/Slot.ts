import * as R from 'ramda';

import type { Board } from './Board';
import { setBoard } from './Board';
import type { Id } from './Id';
import { idToBoardIndex, toId } from './Id';

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

const isValidNumericSlot = R.allPass([isNotInRow, isNotInBlock, isNotInCol]);

export const isValidSlot = (board: Board, id: Id, slot: Slot) =>
  slot === '' || isValidNumericSlot(setBoard(board, id, ''), id, slot);

export const getSlot = (board: Board, id: Id): Slot => R.path(idToBoardIndex(id), board) as Slot;

export const deleteSlot = (board: Board, id: Id): Board => {
  const newBoard = setBoard(board, id, '');
  return newBoard;
};

export const editSlot = (board: Board, id: Id, slot: NumericSlot): [Board, SlotState] => {
  const validSlot = isValidSlot(board, id, slot);
  const newBoard = setBoard(board, id, slot);
  const state: SlotState = !validSlot ? 'mistake' : 'correct';
  return [newBoard, state];
};

export const getMutableSlotIds = (board: Board) => {
  return board
    .map((blockRow, blockRowIndex) =>
      blockRow.map((blocks, blockColIndex) =>
        blocks.map((slots, slotRowIndex) =>
          slots.flatMap((slot, slotColIndex) =>
            slot === '' ? [toId([blockRowIndex, blockColIndex, slotRowIndex, slotColIndex])] : [],
          ),
        ),
      ),
    )
    .flat(3);
};
