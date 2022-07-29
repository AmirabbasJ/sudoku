import type { Board } from '@sudoku/core';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';

const compareExactArr = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((x, i) => b[i] === x);

export const areSameSudoku = (b1: Board, b2: Board) =>
  pipe(
    [b1, b2],
    map(b => b.flat(3)),
    ([a, b]) => compareExactArr(a!, b!),
  );
