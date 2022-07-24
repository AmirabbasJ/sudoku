import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { formatTime } from '../domain/formatTime';
import { PauseIcon } from './Icons/PauseIcon';
import { PlayIcon } from './Icons/PlayIcon';

const Slider = styled.div`
  width: 10rem;
  height: 3.5rem;
  margin: 0 1rem;
  border-radius: 2rem;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  position: relative;
  background-color: royalblue;
  cursor: pointer;
`;

const Button = styled.button<{ isPaused: boolean }>`
  height: 3.5rem;
  width: ${({ isPaused }) => (isPaused ? '100%' : '3.5rem')};
  transition: width 300ms ease-in-out;
  position: absolute;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 20rem;
  background-color: #ebeff4;
`;
// background-color: #ebeff4;

// color: royalblue;

const Sign = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Time = styled.p`
  justify-self: center;
  color: white;
  font-size: 1.2em;
  grid-column: 2;
`;

export const Timer: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused) setSecondsPassed(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isPaused]);

  const toggle = () => setIsPaused(!isPaused);
  const time = formatTime(secondsPassed);

  return (
    <Slider onClick={toggle}>
      <Button isPaused={isPaused}>
        <Sign>{isPaused ? <PlayIcon /> : <PauseIcon />}</Sign>
      </Button>
      <Time>{time}</Time>
    </Slider>
  );
};
