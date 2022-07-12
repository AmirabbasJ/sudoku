import * as R from 'ramda';

type NumericSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type EmptySlot = '';
export type Slot = EmptySlot | NumericSlot;

export type Block = [[Slot, Slot, Slot], [Slot, Slot, Slot], [Slot, Slot, Slot]];
export type Board = [[Block, Block, Block], [Block, Block, Block], [Block, Block, Block]];

export type Id = `${number}-${number}-${number}-${number}`;
export type BoardIndex = [number, number, number, number];

export const toId = (bi: number, rbi: number, bli: number, si: number): Id => `${bi}-${rbi}-${bli}-${si}`;

export const fromIdToIndex = (id: Id): BoardIndex => id.split('-').map(x => Number.parseInt(x, 10)) as BoardIndex;

export const parseSlot = (x: string): Slot | null =>
  /^(Backspace)|(Delete)$/.test(x) ? '' : /^([1-9]{1})$/.test(x) ? (Number.parseInt(x, 10) as NumericSlot) : null;

export const editSlot = (initBoard: Board, id: Id, key: string) => {
  const slot = parseSlot(key);
  if (slot == null) return initBoard;
  const indexes = fromIdToIndex(id);
  return R.assocPath(indexes, slot, initBoard);
};
