import React, { useState } from 'react';
import styled from 'styled-components';

import { useBoard } from '../hooks/useBoard';
import { DraftButton } from './DraftButton';
import { EraserButton } from './EraserButton';
import { Timer } from './Timer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

export const Controls: React.FC = () => {
  const { deleteSelectedSlot } = useBoard();
  const [isOn, setIsOn] = useState(false);
  return (
    <Container>
      <EraserButton onClick={deleteSelectedSlot} title="Erase" />
      <Timer />
      <DraftButton title="Draft" onClick={() => setIsOn(!isOn)} isOn={isOn} />
    </Container>
  );
};
