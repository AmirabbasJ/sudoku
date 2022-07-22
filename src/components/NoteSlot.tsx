import styled from 'styled-components';

import type { Id } from '../domain/Id';

const StyledNoteSlot = styled.div`
  background: white;
  width: 4rem;
  height: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Note = styled.p`
  display: flex;
  font-size: 0.8em;
  justify-content: center;
  align-items: center;
  color: #738293;
`;

interface NoteSlotProps {
  id: Id;
  notes: ['' | 1, '' | 2, '' | 3, '' | 4, '' | 5, '' | 6, '' | 7, '' | 8, '' | 9];
}

export const NoteSlot: React.FC<NoteSlotProps> = ({ notes }) => {
  return (
    <StyledNoteSlot>
      {notes.map((n, i) => (
        <Note key={i}>{n}</Note>
      ))}
    </StyledNoteSlot>
  );
};
