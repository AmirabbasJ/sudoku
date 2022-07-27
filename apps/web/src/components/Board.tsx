/* eslint-disable react/no-array-index-key */

import { getSlot, keyToDir, parseSlot, toId } from '@sudoku/core';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { useBoard } from '../hooks/useBoard';
import { useDraft } from '../hooks/useDraft';
import { useGameState } from '../hooks/useGameState';
import { NoteSlot } from './NoteSlot';
import { Slot } from './Slot';

const Container = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.boardBorder};
  display: grid;
  grid-gap: 0.125rem;
  justify-items: center;
  align-items: center;
  align-self: center;
  border: 0.125rem solid ${({ theme }) => theme.boardBorder};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  position: relative;
`;

const Block = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 0.0625rem;
  border-left: none;
  background-color: ${({ theme }) => theme.slotsGaps};
  border-bottom: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Overlay = styled.div<{ show: boolean }>`
  position: absolute;
  width: ${({ show }) => (show ? '100%' : '0%')};
  height: ${({ show }) => (show ? '100%' : '0%')};
  background-color: ${({ theme }) => theme.overlayColor};
`;

export const Board: React.FC = () => {
  const {
    board,
    editSelectedSlot,
    deleteSelectedSlot,
    mistakeIds,
    moveSelectedSlot,
    mutableIds,
    selectSlot,
    selectedId,
    coveredSlotIds,
    addNote,
    notes,
  } = useBoard();

  const { isPaused } = useGameState();

  const { isDraftMode } = useDraft();
  const editSlotOnKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const slot = parseSlot(key);
      if (slot == null) return;
      if (slot === '') return deleteSelectedSlot();
      return isDraftMode ? addNote(slot) : editSelectedSlot(slot);
    },
    [isDraftMode, deleteSelectedSlot, addNote, editSelectedSlot],
  );

  const moveOnKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const dir = keyToDir(key);
      if (dir == null) return;
      return moveSelectedSlot(dir);
    },
    [moveSelectedSlot],
  );

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

  const selectedSlot = selectedId == null ? null : getSlot(board, selectedId);

  return (
    <Container>
      <Overlay show={isPaused} />
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
                const isMistake = mistakeIds.includes(id);
                const isMutable = mutableIds.includes(id);
                const isCoveredSlot = coveredSlotIds.includes(id);
                const isNoteSlot =
                  slot === '' && !notes[id]!.every(x => x === '');
                const hasSameContent = selectedSlot === slot && slot !== '';
                return isNoteSlot ? (
                  <NoteSlot
                    id={id}
                    key={id}
                    notes={notes[id]!}
                    isMutable={isMutable}
                    isSelected={isSelected}
                    isMistake={isMistake}
                    isCoveredSlot={isCoveredSlot}
                    hasSameContent={hasSameContent}
                    onClick={() => selectSlot(id)}
                  />
                ) : (
                  <Slot
                    isMutable={isMutable}
                    isSelected={isSelected}
                    isMistake={isMistake}
                    isCoveredSlot={isCoveredSlot}
                    hasSameContent={hasSameContent}
                    key={id}
                    onClick={() => selectSlot(id)}
                  >
                    {slot}
                  </Slot>
                );
              }),
            )}
          </Block>
        )),
      )}
    </Container>
  );
};
