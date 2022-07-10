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
