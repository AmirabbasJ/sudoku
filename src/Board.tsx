import styled from 'styled-components';

const SBoard = styled.div`
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
  <SBoard>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
    <Block>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
      <Slot>1</Slot>
    </Block>
  </SBoard>
);
