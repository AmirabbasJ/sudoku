import { useContext } from 'react';

import { GameStateCtx } from '../context/GameStateCtx';

export const useGameState = () => {
  const { gameState, setGameState } = useContext(GameStateCtx);
  const togglePause = () =>
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  const isPaused = gameState === 'paused';
  return { gameState, isPaused, togglePause, setGameState };
};
