import React from 'react';
import styled from 'styled-components';

import type { NumericSlot } from '../domain/Slot';
import { useBoard } from '../hooks/useBoard';
import { useDraft } from '../hooks/useDraft';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 0.5rem;
`;

const Pad = styled.button`
  outline: none;
  border: none;
  padding: 3rem;
  font-size: 2.5em;
  border-radius: 0.5rem;
  background-color: #ebeff4;
  color: royalblue;
  cursor: pointer;
  :hover {
    background-color: #dce3ed;
  }
  :active {
    background-color: #d2dbe6;
  }
`;

const pads = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export const Keypad: React.FC = () => {
  const { editSelectedSlot, addNote } = useBoard();

  const { isDraftMode } = useDraft();
  const editSlotOnKeypadClick = (v: NumericSlot) => {
    return isDraftMode ? addNote(v) : editSelectedSlot(v);
  };
  return (
    <Container>
      {pads.map(n => (
        <Pad value={n} key={n} onClick={() => editSlotOnKeypadClick(n)}>
          {n}
        </Pad>
      ))}
    </Container>
  );
};
