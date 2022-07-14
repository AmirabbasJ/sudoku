export type Id = `${number}-${number}-${number}-${number}`;
export type BoardIndex = [number, number, number, number];

export const toId = (blockRowIndex: number, blockColIndex: number, slotRowIndex: number, slotColIndex: number): Id =>
  `${blockRowIndex}-${blockColIndex}-${slotRowIndex}-${slotColIndex}`;
export const idToBoardIndex = (id: Id): BoardIndex => id.split('-').map(x => Number.parseInt(x, 10)) as BoardIndex;
