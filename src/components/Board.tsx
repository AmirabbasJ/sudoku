import {
  getSlot,
  isUnfilled,
  keyToDir,
  keyToSlotValue,
  toId,
} from '@sudoku/core';
import { useDraft, useSudoku } from '@sudoku/hooks';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Block } from './Block';
import { Overlay } from './Overlay';
import { Slot } from './Slot';

const Container = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.border};
  display: grid;
  grid-gap: 0.125rem;
  justify-items: center;
  align-items: center;
  align-self: center;
  border: 0.125rem solid ${({ theme }) => theme.border};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  position: relative;
`;

export const Board: React.FC = () => {
  const {
    board,
    editSelectedSlot,
    deleteSelectedSlot,
    moveSelectedSlot,
    selectSlot,
    selectedId,
    coveredSlotIds,
    addNote,
  } = useSudoku();

  const { isDraftMode, toggleDraftMode } = useDraft();
  const editSlotOnKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const slot = keyToSlotValue(key);
      if (slot == null) return;
      if (slot === '') return deleteSelectedSlot();
      return isDraftMode ? addNote(slot) : editSelectedSlot(slot);
    },
    [addNote, deleteSelectedSlot, editSelectedSlot, isDraftMode],
  );

  const moveOnKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const dir = keyToDir(key);
      if (dir == null) return;
      return moveSelectedSlot(dir);
    },
    [moveSelectedSlot],
  );

  const addShortcuts = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key.toLowerCase() === 'e') return toggleDraftMode();
      if (key.toLowerCase() === 'q') return deleteSelectedSlot();
    },
    [deleteSelectedSlot, toggleDraftMode],
  );

  useEffect(() => {
    document.addEventListener('keydown', addShortcuts);

    return () => {
      document.removeEventListener('keydown', addShortcuts);
    };
  }, [addShortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', editSlotOnKeydown);

    return () => {
      document.removeEventListener('keydown', editSlotOnKeydown);
    };
  }, [editSlotOnKeydown]);

  useEffect(() => {
    document.addEventListener('keydown', moveOnKeydown);

    return () => {
      document.removeEventListener('keydown', moveOnKeydown);
    };
  }, [moveOnKeydown]);

  const primaryEmphasized =
    selectedId == null ? null : getSlot(board, selectedId);

  return (
    <Container>
      <Overlay />
      {board.map((blockRow, blockRowIndex) =>
        blockRow.map((blocks, blockColIndex) => (
          <Block key={blockColIndex + blockRowIndex}>
            {blocks.map((slots, slotRowIndex) =>
              slots.map((slot, slotColIndex) => {
                const id = toId([
                  blockRowIndex,
                  blockColIndex,
                  slotRowIndex,
                  slotColIndex,
                ]);
                const isSelected = id === selectedId;
                const isCoveredSlot = coveredSlotIds.includes(id);
                const hasSameContentAsSelected =
                  primaryEmphasized?.value === slot.value && !isUnfilled(slot);
                return (
                  <Slot
                    onClick={() => selectSlot(id)}
                    id={id}
                    key={id}
                    slot={slot}
                    isSelected={isSelected}
                    isCoveredSlot={isCoveredSlot}
                    hasSameContent={hasSameContentAsSelected}
                  />
                );
              }),
            )}
          </Block>
        )),
      )}
    </Container>
  );
};
