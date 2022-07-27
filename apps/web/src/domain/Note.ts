import type { Id } from './Id';
import type { Slot } from './Slot';

export type Note = [
  '' | 1,
  '' | 2,
  '' | 3,
  '' | 4,
  '' | 5,
  '' | 6,
  '' | 7,
  '' | 8,
  '' | 9,
];
export const emptyNote: Note = ['', '', '', '', '', '', '', '', ''];
const fullNote: Note = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface Notes {
  [key: Id]: Note;
}

export const addToNote = (note: Note, slot: Slot): Note =>
  fullNote.map((v, i) => {
    const currNum = note[i]!;
    const shouldToggle = currNum === slot;
    return shouldToggle ? '' : v === slot ? slot : currNum;
  }) as Note;
