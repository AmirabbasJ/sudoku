/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { keyToDir } from '../domain/Direction';
import { toId } from '../domain/Id';
import { getSlot, parseSlot } from '../domain/Slot';
import { useBoard } from '../hooks/useBoard';
import { useDraft } from '../hooks/useDraft';
import { NoteSlot } from './NoteSlot';
import { Slot } from './Slot';

const Container = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: black;
  display: grid;
  grid-gap: 0.125rem;
  justify-items: center;
  align-items: center;
  border: 0.125rem solid black;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Block = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 0.0625rem;
  border-left: none;
  background-color: #c0c0c0;
  border-bottom: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
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
    emptyNotes,
  } = useBoard();

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
      {board.map((blockRow, blockRowIndex) =>
        blockRow.map((blocks, blockColIndex) => (
          <Block key={blockColIndex + blockRowIndex}>
            {blocks.map((slots, slotRowIndex) =>
              slots.map((slot, slotColIndex) => {
                const id = toId([blockRowIndex, blockColIndex, slotRowIndex, slotColIndex]);
                const isSelected = id === selectedId;
                const isMistake = mistakeIds.includes(id);
                const isMutable = mutableIds.includes(id);
                const isCoveredSlot = coveredSlotIds.includes(id);
                const isNoteSlot = slot === '' && !notes[id]!.every(x => x === '');
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
                    onClick={() => selectSlot(isSelected, id)}
                  />
                ) : (
                  <Slot
                    isMutable={isMutable}
                    isSelected={isSelected}
                    isMistake={isMistake}
                    isCoveredSlot={isCoveredSlot}
                    hasSameContent={hasSameContent}
                    key={id}
                    onClick={() => selectSlot(isSelected, id)}
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
