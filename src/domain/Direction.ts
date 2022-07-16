import * as R from 'ramda';

import type { Id } from './Id';
import { idToBoardIndex, toId } from './Id';

export type Direction = 'Down' | 'Left' | 'Right' | 'Up';

export const moveUp = (id: Id): Id => {
  const [blockRow, _, slotRow, __] = idToBoardIndex(id);

  const shouldGoNextBlock = slotRow - 1 <= -1;
  const shouldGoLastBlock = shouldGoNextBlock && blockRow - 1 <= -1;

  const nextSlotRow = shouldGoNextBlock ? 2 : slotRow - 1;
  const nextBlockRow = shouldGoLastBlock ? 2 : shouldGoNextBlock ? blockRow - 1 : blockRow;
  return toId([nextBlockRow, _, nextSlotRow, __]);
};

export const keyToDir = (key: string): Direction | null =>
  key === 'ArrowUp'
    ? 'Up'
    : key === 'ArrowDown'
    ? 'Down'
    : key === 'ArrowLeft'
    ? 'Left'
    : key === 'ArrowRight'
    ? 'Right'
    : null;

export const moveInBoard = (id: Id, dir: Direction): Id => {
  if (dir === 'Up') return moveUp(id);
  return id;
};
