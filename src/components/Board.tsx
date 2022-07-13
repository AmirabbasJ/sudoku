/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import styled from 'styled-components';

import type { Id, Slot as ISlot } from '../domain/Board';
import { editSlot, toId } from '../domain/Board';
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

const Slot = styled.div<{ isSelected: boolean; isFailure: boolean }>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ isSelected }) => (isSelected ? '#ebebeb' : 'white')};
  color: ${({ isFailure }) => (isFailure ? 'tomato' : 'initial')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
  outline: none;
`;

const initBoard = getBoard();
export const Board: React.FC = () => {
  const [board, setBoard] = useState(initBoard);
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const [mistakeIds, setMistakeIds] = useState<Id[]>([]);

  const onSlotChange = (key: string, id: Id, slot: ISlot) => {
    if (slot !== '') return;
    const [newBoard, msg] = editSlot(board, id, key);
    if (msg === 'failure') setMistakeIds(ids => [...ids, id]);

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
      {board.map((rowBlock, bi) =>
        rowBlock.map((b, rbi) => (
          <Block key={rbi + bi}>
            {b.map((block, bli) =>
              block.map((slot, si) => {
                const id = toId(bi, rbi, bli, si);
                const isSelected = id === selectedId;
                const isFailure = mistakeIds.includes(id);
                return (
                  <Slot
                    isSelected={isSelected}
                    isFailure={isFailure}
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
