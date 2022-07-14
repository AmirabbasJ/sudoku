/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import styled from 'styled-components';

import type { Id, Slot as ISlot } from '../domain/Board';
import { editSlot, parseSlot, toId } from '../domain/Board';
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
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const [mistakeIds, setMistakeIds] = useState<Id[]>([]);

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
  const toggleFocus = (target: HTMLDivElement, isSelected: boolean, id: Id) => {
    if (isSelected) {
      setSelectedId(null);
      target.blur();
      return;
    }
    setSelectedId(id);
    target.focus();
  };

  return (
    <Container>
      {board.map((blockRow, blockRowIndex) =>
        blockRow.map((blocks, blockColIndex) => (
          <Block key={blockColIndex + blockRowIndex}>
            {blocks.map((slots, slotRowIndex) =>
              slots.map((slot, slotColIndex) => {
                const id = toId(blockRowIndex, blockColIndex, slotRowIndex, slotColIndex);
                const isSelected = id === selectedId;
                const isMistake = mistakeIds.includes(id);
                return (
                  <Slot
                    isSelected={isSelected}
                    isMistake={isMistake}
                    key={id}
                    tabIndex={0}
                    onKeyDown={({ key }) => onSlotChange(key, id, slot)}
                    onClick={({ currentTarget }) => toggleFocus(currentTarget, isSelected, id)}
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
