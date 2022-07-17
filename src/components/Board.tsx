/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import styled from 'styled-components';

import { keyToDir } from '../domain/Direction';
import { toId } from '../domain/Id';
import { parseSlot } from '../domain/Slot';
import { useBoard } from '../hooks/useBoard';

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
  const { board, editViewSlot, mistakeIds, moveSelectedSlot, mutableIds, selectSlot, selectedId } = useBoard();

  useEffect(() => {
    const editSlotOnKeydown = ({ key }: KeyboardEvent) => {
      const slot = parseSlot(key);
      if (slot == null) return;
      editViewSlot(slot);
    };
    document.addEventListener('keydown', editSlotOnKeydown);
    return () => {
      document.removeEventListener('keydown', editSlotOnKeydown);
    };
  }, [editViewSlot]);

  useEffect(() => {
    const moveOnKeydown = ({ key }: KeyboardEvent) => {
      const dir = keyToDir(key);
      if (dir == null) return;
      moveSelectedSlot(dir);
    };
    document.addEventListener('keydown', moveOnKeydown);
    return () => {
      document.removeEventListener('keydown', moveOnKeydown);
    };
  }, [moveSelectedSlot]);

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
