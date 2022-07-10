/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import styled from 'styled-components';

import type { Id } from '../domain/Board';
import { toId, updateBoard } from '../domain/Board';
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

const Slot = styled.div<{ isSelected: boolean }>`
  width: 4rem;
  background-color: ${({ isSelected }) => (isSelected ? '#d1d1d1' : '#ebebeb')};
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  cursor: pointer;
`;
const initBoard = getBoard();
export const Board: React.FC = () => {
  const [board, setBoard] = useState(initBoard);
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  return (
    <Container>
      {board.map((rowBlock, bi) =>
        rowBlock.map((b, rbi) => (
          <Block key={bi}>
            {b.map((block, bli) =>
              block.map((slot, si) => {
                const id = toId(bi, rbi, bli, si);
                return (
                  <Slot
                    isSelected={id === selectedId}
                    key={id}
                    // onClick={() => setBoard(updateBoard(board, id, 'empty'))}
                    onClick={() => setSelectedId(id)}
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
