/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { keyToDir } from '../domain/Direction';
import { toId } from '../domain/Id';
import { parseSlot } from '../domain/Slot';
import { useBoard } from '../hooks/useBoard';

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

const Slot = styled.div<{ isSelected: boolean; isMistake: boolean; isMutable: boolean }>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ isSelected, isMistake }) => (isSelected ? '#dbecff' : isMistake ? '#ffdbdb' : 'white')};
  color: ${({ isMistake, isMutable }) => (isMistake ? 'tomato' : isMutable ? 'royalblue' : 'initial')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
  cursor: pointer;
  user-select: none;
  outline: none;
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
  } = useBoard();

  const editSlotOnKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const slot = parseSlot(key);
      if (slot == null) return;
      if (slot === '') return deleteSelectedSlot();
      return editSelectedSlot(slot);
    },
    [editSelectedSlot, deleteSelectedSlot],
  );

  useEffect(() => {
    document.addEventListener('keydown', editSlotOnKeydown);
    return () => {
      document.removeEventListener('keydown', editSlotOnKeydown);
    };
  }, [editSlotOnKeydown]);

  const moveOnKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const dir = keyToDir(key);
      if (dir == null) return;
      moveSelectedSlot(dir);
    },
    [moveSelectedSlot],
  );

  useEffect(() => {
    document.addEventListener('keydown', moveOnKeydown);
    return () => {
      document.removeEventListener('keydown', moveOnKeydown);
    };
  }, [moveOnKeydown]);

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
                return (
                  <Slot
                    isMutable={isMutable}
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
