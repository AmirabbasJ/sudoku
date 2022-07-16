/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { editSlot } from '../domain/Board';
import { keyToDir, moveInBoard } from '../domain/Direction';
import type { Id } from '../domain/Id';
import { toId } from '../domain/Id';
import type { Slot as ISlot } from '../domain/Slot';
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

  useEffect(() => {
    const changeSelectedSlot = ({ key }: KeyboardEvent) => {
      const dir = keyToDir(key);
      if (dir == null) return;
      setSelectedId(id => (id === null ? null : moveInBoard(id, dir)));
    };
    document.addEventListener('keydown', changeSelectedSlot);
    return () => document.removeEventListener('keydown', changeSelectedSlot);
  }, []);

  const onSlotChange = (key: string, id: Id, currSlot: ISlot) => {
    const slot = parseSlot(key);
    const failedToParse = slot == null;
    const slotIsTheSameAsBefore = slot === currSlot;
    const isEmptySlot = currSlot === '';
    const isMistakeSlot = mistakeIds.includes(id);
    const isMutableSlot = !isEmptySlot && !isMistakeSlot;

    if (failedToParse) return;
    if (slotIsTheSameAsBefore) return;
    if (isMutableSlot) return;
    if (isMistakeSlot) setMistakeIds(mistakeIds.filter(i => i !== id));

    const [newBoard, state] = editSlot(board, id, slot);
    if (state === 'mistake') setMistakeIds(ids => ids.concat(id));

    return setBoard(newBoard);
  };
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
                    tabIndex={0}
                    onKeyDown={({ key }) => onSlotChange(key, id, slot)}
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
