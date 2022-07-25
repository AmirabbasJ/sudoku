import { useContext } from 'react';

import { GameStateCtx } from '../context/GameStateCtx';

export const useGameState = () => {
  const { isPaused, setIsPaused } = useContext(GameStateCtx);
  const toggle = () => setIsPaused(!isPaused);

  return { isPaused, toggle };
};
