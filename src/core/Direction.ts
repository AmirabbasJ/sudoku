/* eslint-disable @typescript-eslint/naming-convention */
import type { Id } from './Id';
import { idToBoardIndex, toId } from './Id';

export type Direction = 'Down' | 'Left' | 'Right' | 'Up';

export const moveUp = (id: Id): Id => {
  const [blockRow, _, slotRow, __] = idToBoardIndex(id);

  const shouldGoNextBlock = slotRow - 1 <= -1;
  const shouldGoLastBlock = shouldGoNextBlock && blockRow - 1 <= -1;

  const nextSlotRow = shouldGoNextBlock ? 2 : slotRow - 1;
  const nextBlockRow = shouldGoLastBlock
    ? 2
    : shouldGoNextBlock
    ? blockRow - 1
    : blockRow;
  return toId([nextBlockRow, _, nextSlotRow, __]);
};

export const moveDown = (id: Id): Id => {
  const [blockRow, _, slotRow, __] = idToBoardIndex(id);

  const shouldGoNextBlock = slotRow + 1 >= 3;
  const shouldGoLastBlock = shouldGoNextBlock && blockRow + 1 >= 3;

  const nextSlotRow = shouldGoNextBlock ? 0 : slotRow + 1;
  const nextBlockRow = shouldGoLastBlock
    ? 0
    : shouldGoNextBlock
    ? blockRow + 1
    : blockRow;
  return toId([nextBlockRow, _, nextSlotRow, __]);
};

export const moveLeft = (id: Id): Id => {
  const [_, blockCol, __, slotCol] = idToBoardIndex(id);

  const shouldGoNextBlock = slotCol - 1 <= -1;
  const shouldGoLastBlock = shouldGoNextBlock && blockCol - 1 <= -1;

  const nextSlotCol = shouldGoNextBlock ? 2 : slotCol - 1;
  const nextBlockCol = shouldGoLastBlock
    ? 2
    : shouldGoNextBlock
    ? blockCol - 1
    : blockCol;
  return toId([_, nextBlockCol, __, nextSlotCol]);
};

export const moveRight = (id: Id): Id => {
  const [_, blockCol, __, slotCol] = idToBoardIndex(id);

  const shouldGoNextBlock = slotCol + 1 >= 3;
  const shouldGoLastBlock = shouldGoNextBlock && blockCol + 1 >= 3;

  const nextSlotCol = shouldGoNextBlock ? 0 : slotCol + 1;
  const nextBlockCol = shouldGoLastBlock
    ? 0
    : shouldGoNextBlock
    ? blockCol + 1
    : blockCol;
  return toId([_, nextBlockCol, __, nextSlotCol]);
};

export const keyToDir = (key: string): Direction | null =>
  key === 'ArrowUp' || key.toLowerCase() === 'w'
    ? 'Up'
    : key === 'ArrowDown' || key.toLowerCase() === 's'
    ? 'Down'
    : key === 'ArrowLeft' || key.toLowerCase() === 'a'
    ? 'Left'
    : key === 'ArrowRight' || key.toLowerCase() === 'd'
    ? 'Right'
    : null;

export const moveInBoard = (id: Id, dir: Direction): Id =>
  dir === 'Up'
    ? moveUp(id)
    : dir === 'Down'
    ? moveDown(id)
    : dir === 'Right'
    ? moveRight(id)
    : moveLeft(id);
