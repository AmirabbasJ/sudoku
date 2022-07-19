import React from 'react';
import styled from 'styled-components';

import { useBoard } from '../hooks/useBoard';
import { EraseBtn } from './EraseBtn';
import { Timer } from './Timer';

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

export const Controls: React.FC = () => {
  const { deleteSelectedSlot } = useBoard();
  return (
    <Div>
      <EraseBtn onClick={deleteSelectedSlot} />
      <Timer />
    </Div>
  );
};
