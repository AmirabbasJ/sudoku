import { formatTime } from '@sudoku/core';
import { useLocalStorageState } from 'ahooks';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useGameState } from '../hooks/useGameState';
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
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const Button = styled.button<{ isPlaying: boolean }>`
  height: 3.5rem;
  width: ${({ isPlaying }) => (isPlaying ? '3.5rem' : '100%')};
  transition: width 300ms ease-in-out;
  position: absolute;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 20rem;
  background-color: ${({ theme }) => theme.secondary};
`;

const Sign = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Time = styled.p`
  justify-self: center;
  color: ${({ theme }) => theme.timeFontColor};
  font-size: 1.2em;
  grid-column: 2;
`;

export const Timer: React.FC = () => {
  const { isPlaying, togglePause } = useGameState();
  const [secondsPassed, setSecondsPassed] = useLocalStorageState('timer', {
    defaultValue: 0,
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (isPlaying) setSecondsPassed(seconds => (seconds as number) + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, setSecondsPassed]);

  const time = formatTime(secondsPassed);

  return (
    <Slider onClick={togglePause}>
      <Button isPlaying={isPlaying}>
        <Sign>{isPlaying ? <PauseIcon /> : <PlayIcon />}</Sign>
      </Button>
      <Time>{time}</Time>
    </Slider>
  );
};
