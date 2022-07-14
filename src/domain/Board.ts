import * as R from 'ramda';

type NumericSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type EmptySlot = '';
export type Slot = EmptySlot | NumericSlot;
export type SlotState = 'correct' | 'mistake';

export type Block = [[Slot, Slot, Slot], [Slot, Slot, Slot], [Slot, Slot, Slot]];
export type Board = [[Block, Block, Block], [Block, Block, Block], [Block, Block, Block]];

export type Id = `${number}-${number}-${number}-${number}`;
export type BoardIndex = [number, number, number, number];

export const toId = (blockRowIndex: number, blockColIndex: number, slotRowIndex: number, slotColIndex: number): Id =>
  `${blockRowIndex}-${blockColIndex}-${slotRowIndex}-${slotColIndex}`;
export const idToBoardIndex = (id: Id): BoardIndex => id.split('-').map(x => Number.parseInt(x, 10)) as BoardIndex;

export const parseSlot = (x: string): Slot | null =>
  /^(Backspace)|(Delete)$/.test(x) ? '' : /^([1-9]{1})$/.test(x) ? (Number.parseInt(x, 10) as NumericSlot) : null;

const setSlot = (board: Board, id: Id, slot: Slot) => {
  const boardIndex = idToBoardIndex(id);
  return R.assocPath(boardIndex, slot, board);
};

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

export const editSlot = (board: Board, id: Id, slot: Slot): [Board, SlotState] => {
  const isValidSlot = slot === '' || isValidNumericSlot(board, id, slot);
  const newBoard = setSlot(board, id, slot);
  const state: SlotState = !isValidSlot ? 'mistake' : 'correct';
  return [newBoard, state];
};
