import * as R from 'ramda';

type NumericSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type EmptySlot = '';
export type Slot = EmptySlot | NumericSlot;

export type Block = [[Slot, Slot, Slot], [Slot, Slot, Slot], [Slot, Slot, Slot]];
export type Board = [[Block, Block, Block], [Block, Block, Block], [Block, Block, Block]];

export type Id = `${number}-${number}-${number}-${number}`;
export type BoardIndex = [number, number, number, number];
export const toId = (bi: number, rbi: number, bli: number, si: number): Id => `${bi}-${rbi}-${bli}-${si}`;

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
// const getRow = () => {};
// const getCol = () => {};

const checkIsValidSlot = (board: Board, id: Id, key: NumericSlot): boolean => !checkIsInBlock(board, id, key);

export const editSlot = (board: Board, id: Id, key: string): Board | 'failure' => {
  const slot = parseSlot(key);
  if (slot == null) return board;
  if (slot === '') return setSlot(board, id, slot);

  const isValidSlot = checkIsValidSlot(board, id, slot);
  if (!isValidSlot) return 'failure';

  return setSlot(board, id, slot);
};
