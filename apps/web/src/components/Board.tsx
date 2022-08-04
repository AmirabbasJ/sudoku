/* eslint-disable react/no-array-index-key */

import { getSlot, keyToDir, parseSlot, toId } from '@sudoku/core';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { useDraft } from '../hooks/useDraft';
import { useGameState } from '../hooks/useGameState';
import { useSudoku } from '../hooks/useSudoku';
import { Block } from './Block';
import { LoadingBoard } from './LoadingBoard';
import { NoteSlot } from './NoteSlot';
import { Overlay } from './Overlay';
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
  } = useSudoku();

  const { gameState, isPlaying } = useGameState();

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
  console.log(isPlaying);
  if (!isPlaying)
    return (
      <Container>
        <Overlay state={gameState} />
        <LoadingBoard />
      </Container>
    );

  return (
    <Container>
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
