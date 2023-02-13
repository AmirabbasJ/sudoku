import type { Id } from './Id';
import type { SlotValue, UnfilledSlot } from './Slot';

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

export const editNote = (
  value: SlotValue,
  slot: UnfilledSlot,
): UnfilledSlot => {
  const newNotes = fullNote.map((v, i) => {
    const currNote = slot.notes[i] as SlotValue;
    const shouldToggle = currNote === value;
    return shouldToggle ? '' : v === value ? value : currNote;
  }) as Note;

  return { ...slot, notes: newNotes };
};
