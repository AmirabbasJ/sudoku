/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import type { Id } from '../domain/Id';
import type { Note as INote } from '../domain/Note';
import type { SlotProps } from './Slot';
import { Slot } from './Slot';

const StyledNoteSlot = styled(Slot)`
  width: 4rem;
  height: 4rem;
  display: grid;
  font-size: 0.8em;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Note = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.noteColor};
`;

interface NoteSlotProps extends SlotProps {
  id: Id;
  notes: INote;
  onClick: () => void;
}

export const NoteSlot: React.FC<NoteSlotProps> = ({ notes, id, onClick, ...slotProps }) => {
  return (
    <StyledNoteSlot {...slotProps} onClick={onClick}>
      {notes.map((n, i) => (
        <Note key={id + i}>{n}</Note>
      ))}
    </StyledNoteSlot>
  );
};
