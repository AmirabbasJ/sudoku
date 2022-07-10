// export type Slot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// export type RowSlot = [Slot, Slot, Slot];
// export type Block = [RowSlot, RowSlot, RowSlot];
// export type RowBlock = [Block, Block, Block];
// export type Board = [RowBlock, RowBlock, RowBlock];

export type Slot = 'empty' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
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

export type Id = `${number}-${number}-${number}-${number}`;
export type BoardIndex = [number, number, number, number];

export const toId = (bi: number, rbi: number, bli: number, si: number): Id =>
  `${bi}-${rbi}-${bli}-${si}`;

export const fromIdToIndex = (id: Id): BoardIndex =>
  id.split('-').map((x) => Number.parseInt(x, 10)) as BoardIndex;

export const updateBoard = (b: Board, idx: Id, value: Slot): Board => {
  const [bi, rbi, bli, si] = fromIdToIndex(idx);
  const newBoard: Board = JSON.parse(JSON.stringify(b));
  newBoard![bi]![rbi]![bli]![si] = value;
  return newBoard;
};
