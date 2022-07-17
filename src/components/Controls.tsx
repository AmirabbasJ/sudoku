import React from 'react';
import styled from 'styled-components';

import { useBoard } from '../hooks/useBoard';
import { EraseBtn } from './EraseBtn';

const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

export const Controls: React.FC = () => {
  const { deleteSelectedSlot } = useBoard();
  return (
    <Div>
      <EraseBtn onClick={deleteSelectedSlot} />
    </Div>
  );
};
