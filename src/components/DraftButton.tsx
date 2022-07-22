import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import { PencilIcon } from './Icons/PencilIcon';
import { Title } from './Title';

const State = styled.p<{ isOn: boolean }>`
  position: absolute;
  width: 2rem;
  color: white;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  border-radius: 100rem;
  background-color: ${({ isOn }) => (isOn ? 'royalblue' : '#adb7c3')};
  right: 0;
  top: 0;
  font-weight: bold;
  cursor: default;
  transform: translate(0.6rem, -0.3rem);
`;
const Container = styled.div`
  position: relative;
`;

export const DraftButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);

  return (
    <Container>
      <Button onClick={toggle} withBorder={isOn}>
        <PencilIcon />
      </Button>
      <Title>Draft</Title>
      <State isOn={isOn}>{isOn ? 'ON' : 'OFF'}</State>
    </Container>
  );
};
