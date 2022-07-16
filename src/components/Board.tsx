/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { editSlot, getSlot } from '../domain/Board';
import { keyToDir, moveInBoard } from '../domain/Direction';
import type { Id } from '../domain/Id';
import { toId } from '../domain/Id';
import { parseSlot } from '../domain/Slot';
import { getBoard } from '../getBoard';

const Container = styled.div`
  background-color: black;
  display: grid;
  grid-gap: 2px;
  justify-items: center;
  align-items: center;
  border: 2px solid black;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Block = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 1px;
  border-left: none;
  background-color: black;
  border-bottom: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Slot = styled.div<{ isSelected: boolean; isMistake: boolean }>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ isSelected, isMistake }) => (isSelected ? '#b2d8ff' : isMistake ? '#ffdbdb' : 'white')};
  color: ${({ isMistake }) => (isMistake ? 'tomato' : 'initial')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
  cursor: pointer;
  user-select: none;
  outline: none;
`;

const initBoard = getBoard();
export const Board: React.FC = () => {
  const [board, setBoard] = useState(initBoard);
  const [mistakeIds, setMistakeIds] = useState<Id[]>([]);
  const [selectedId, setSelectedId] = useState<Id | null>(null);

  const editViewSlot = useCallback(
    (key: string) => {
      if (selectedId == null) return;

      const currSlot = getSlot(board, selectedId);
      const slot = parseSlot(key);
      const failedToParse = slot == null;
      const slotIsTheSameAsBefore = slot === currSlot;
      const isEmptySlot = currSlot === '';
      const isMistakeSlot = mistakeIds.includes(selectedId);
      const isMutableSlot = !isEmptySlot && !isMistakeSlot;

      if (failedToParse) return;
      if (slotIsTheSameAsBefore) return;
      if (isMutableSlot) return;
      if (isMistakeSlot) setMistakeIds(mistakeIds.filter(id => id !== selectedId));

      const [newBoard, state] = editSlot(board, selectedId, slot);
      if (state === 'mistake') setMistakeIds(ids => ids.concat(selectedId));

      return setBoard(newBoard);
    },
    [board, mistakeIds, selectedId],
  );

  const moveSelectedSlot = useCallback(
    (key: string) => {
      const dir = keyToDir(key);
      if (dir == null) return;
      setSelectedId(selectedId === null ? null : moveInBoard(selectedId, dir));
    },
    [selectedId],
  );

  useEffect(() => {
    const handleEditViewSlot = ({ key }: KeyboardEvent) => editViewSlot(key);
    const handleMoveSelectedSlot = ({ key }: KeyboardEvent) => moveSelectedSlot(key);

    document.addEventListener('keydown', handleEditViewSlot);
    document.addEventListener('keydown', handleMoveSelectedSlot);

    return () => {
      document.removeEventListener('keydown', handleEditViewSlot);
      document.removeEventListener('keydown', handleMoveSelectedSlot);
    };
  }, [editViewSlot, moveSelectedSlot]);

  const selectSlot = (isSelected: boolean, id: Id) => setSelectedId(isSelected ? null : id);

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
                return (
                  <Slot
                    isSelected={isSelected}
                    isMistake={isMistake}
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
