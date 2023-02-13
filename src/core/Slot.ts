import * as R from 'ramda';

import type { Board } from './Board';
import type { Id } from './Id';
import { idToBoardIndex, toId } from './Id';
import type { Note } from './Note';
import { emptyNote } from './Note';

export type Numeric = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Empty = '';
export type SlotValue = Empty | Numeric;

export type SlotState = 'invalid' | 'prefilled' | 'unfilled' | 'valid';

export interface ValidSlot {
  value: Numeric;
  state: 'valid';
}

export interface InvalidSlot {
  value: Numeric;
  state: 'invalid';
}

export interface PrefilledSlot {
  value: Numeric;
  state: 'prefilled';
}

export interface UnfilledSlot {
  value: Empty;
  state: 'unfilled';
  notes: Note;
}

export type Slot = InvalidSlot | PrefilledSlot | UnfilledSlot | ValidSlot;
export const UnfilledSlot: UnfilledSlot = {
  value: '',
  notes: emptyNote,
  state: 'unfilled',
};

export const isValid = (s: Slot): s is ValidSlot => s.state === 'valid';
export const isInvalid = (s: Slot): s is InvalidSlot => s.state === 'invalid';
export const isPrefilled = (s: Slot): s is PrefilledSlot =>
  s.state === 'prefilled';
export const isUnfilled = (s: Slot): s is UnfilledSlot =>
  s.state === 'unfilled';

export const keyToSlotValue = (x: string): SlotValue | null =>
  /^(Backspace)|(Delete)$/.test(x)
    ? ''
    : /^([1-9]{1})$/.test(x)
    ? (Number.parseInt(x, 10) as Numeric)
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
export const getSlot = (board: Board, id: Id): Slot =>
  R.path(idToBoardIndex(id), board);

const getBlockSlotsIds = (board: Board, id: Id): Id[] => {
  const [selectedBlockRow, selectedBlockCol] = idToBoardIndex(id);

  return getAllSlotIds(board)
    .map(idToBoardIndex)
    .filter(
      ([blockRow, blockCol]) =>
        blockRow === selectedBlockRow && selectedBlockCol === blockCol,
    )
    .map(toId);
};

const getRowSlotsIds = (board: Board, id: Id): Id[] => {
  const [selectedBlockRow, _, selectedSlotRow] = idToBoardIndex(id);

  return getAllSlotIds(board)
    .map(idToBoardIndex)
    .filter(
      ([blockRow, __, slotRow]) =>
        selectedBlockRow === blockRow && slotRow === selectedSlotRow,
    )
    .map(toId);
};

const getColSlotsIds = (board: Board, id: Id): Id[] => {
  const [_, selectedBlockCol, __, selectedSlotCol] = idToBoardIndex(id);

  return getAllSlotIds(board)
    .map(idToBoardIndex)
    .filter(
      ([___, blockCol, ____, slotCol]) =>
        selectedBlockCol === blockCol && slotCol === selectedSlotCol,
    )
    .map(toId);
};

export const getCoveredSlotIds = R.pipe(
  R.juxt([getBlockSlotsIds, getRowSlotsIds, getColSlotsIds]),
  R.flatten,
);
