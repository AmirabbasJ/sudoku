import type { Numeric } from '@sudoku/core';
import { useDraft, useSudoku } from '@sudoku/hooks';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 0.5rem;
`;

const Pad = styled.button`
  outline: none;
  border: none;
  padding: 2rem;
  font-size: 2.5em;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.btnHover};
  }
  :active {
    background-color: ${({ theme }) => theme.btnActive};
  }
`;

const pads = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export const Keypad: React.FC = () => {
  const { editSelectedSlot, addNote } = useSudoku();

  const { isDraftMode } = useDraft();

  const editSlotOnKeypadClick = (v: Numeric) => {
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
