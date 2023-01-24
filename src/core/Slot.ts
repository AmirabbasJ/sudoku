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
  /^(Backspace)|(Delete)$/.test(x)
    ? ''
    : /^([1-9]{1})$/.test(x)
    ? (Number.parseInt(x, 10) as NumericSlot)
    : null;

const getAllSlotIds = (board: Board) => {
  return board
    .map((blockRow, blockRowIndex) =>
      blockRow.map((blocks, blockColIndex) =>
        blocks.map((slots, slotRowIndex) =>
          slots.map((_, slotColIndex) =>
            toId([blockRowIndex, blockColIndex, slotRowIndex, slotColIndex]),
          ),
        ),
      ),
    )
    .flat(3);
};

const getBlockIds = (board: Board, id: Id) => {
  const [selectedBlockRow, selectedBlockCol] = idToBoardIndex(id);

  return getAllSlotIds(board)
    .map(idToBoardIndex)
    .filter(
      ([blockRow, blockCol]) =>
        blockRow === selectedBlockRow && selectedBlockCol === blockCol,
    )
    .map(toId);
};

const isNotInBlock = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const blockSlots = getBlockIds(board, id)
    .map(idToBoardIndex)
    .map(path => R.path(path, board));
  return !blockSlots.includes(slot);
};

const getRowIds = (board: Board, id: Id) => {
  const [selectedBlockRow, _, selectedSlotRow] = idToBoardIndex(id);

  return getAllSlotIds(board)
    .map(idToBoardIndex)
    .filter(
      ([blockRow, __, slotRow]) =>
        selectedBlockRow === blockRow && slotRow === selectedSlotRow,
    )
    .map(toId);
};

const isNotInRow = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const rowSlots = getRowIds(board, id)
    .map(idToBoardIndex)
    .map(path => R.path(path, board));
  return !rowSlots.includes(slot);
};

const getColIds = (board: Board, id: Id) => {
  const [_, selectedBlockCol, __, selectedSlotCol] = idToBoardIndex(id);

  return getAllSlotIds(board)
    .map(idToBoardIndex)
    .filter(
      ([___, blockCol, ____, slotCol]) =>
        selectedBlockCol === blockCol && slotCol === selectedSlotCol,
    )
    .map(toId);
};

const isNotInCol = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const colSlots = getColIds(board, id)
    .map(idToBoardIndex)
    .map(path => R.path(path, board));
  return !colSlots.includes(slot);
};

const isValidNumericSlot = R.allPass([isNotInRow, isNotInBlock, isNotInCol]);

export const isValidSlot = (board: Board, id: Id, slot: Slot) =>
  slot === '' || isValidNumericSlot(setBoard(board, id, ''), id, slot);

export const getCoveredSlotIds = R.pipe(
  R.juxt([getBlockIds, getColIds, getRowIds]),
  R.flatten,
);

export const getSlot = (board: Board, id: Id): Slot =>
  R.path(idToBoardIndex(id), board);

export const deleteSlot = (board: Board, id: Id): Board => {
  const newBoard = setBoard(board, id, '');
  return newBoard;
};

export const editSlot = (
  board: Board,
  id: Id,
  slot: NumericSlot,
): [Board, SlotState] => {
  const validSlot = isValidSlot(board, id, slot);
  const newBoard = setBoard(board, id, slot);
  const state: SlotState = !validSlot ? 'mistake' : 'correct';
  return [newBoard, state];
};

export const getMutableSlotIds = (board: Board) =>
  getAllSlotIds(board).filter(id => getSlot(board, id) === '');
