import type { Id } from './Id';

export type Note = ['' | 1, '' | 2, '' | 3, '' | 4, '' | 5, '' | 6, '' | 7, '' | 8, '' | 9];
export const emptyNote: Note = ['', '', '', '', '', '', '', '', ''];
export interface Notes {
  [key: Id]: Note;
}
