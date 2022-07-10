/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

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

const Slot = styled.div`
  width: 4rem;
  background-color: #ebebeb;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Board: React.FC = () => (
  <Container>
    {getBoard()
      .flat()
      .map((rowBlock, bi) => (
        <Block key={bi}>
          {rowBlock.map((block, bli) =>
            block.map((slot, si) => <Slot key={bi + bli + si}>{slot}</Slot>),
          )}
        </Block>
      ))}
  </Container>
);
