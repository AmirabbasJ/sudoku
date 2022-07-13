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

const checkIsInBlock = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const [blockRow, blockCol] = idToBoardIndex(id);
  const block = board[blockRow]![blockCol]!;
  const blockNumbers = block.flat();
  return blockNumbers.includes(slot);
};

const checkIsInRow = (board: Board, id: Id, slot: NumericSlot): boolean => {
  const [blockRow, _, slotRow] = idToBoardIndex(id);
  const row = R.pluck(slotRow, board[blockRow]!).flat();
  return row.includes(slot);
};
// const getCol = () => {};

const checkIsValidSlot = (board: Board, id: Id, key: Slot): boolean => {
  if (key === '') return true;
  console.log(checkIsInRow(board, id, key));
  return !checkIsInRow(board, id, key) && !checkIsInBlock(board, id, key);
};

export const editSlot = (board: Board, id: Id, slot: Slot): [Board, SlotState] => {
  const isValidSlot = checkIsValidSlot(board, id, slot);
  const newBoard = setSlot(board, id, slot);
  const state: SlotState = !isValidSlot ? 'mistake' : 'correct';
  return [newBoard, state];
};
