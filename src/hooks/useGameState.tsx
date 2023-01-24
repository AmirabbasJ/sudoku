import { useContext } from 'react';

import { GameStateCtx } from '../context/GameStateCtx';

export const useGameState = () => {
  const { gameState, setGameState, setDifficulty, difficulty } =
    useContext(GameStateCtx);

  const isPaused = gameState === 'paused';
  const isPlaying = gameState === 'playing';

  const togglePause = () => {
    if (isPaused || isPlaying)
      setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  return {
    setDifficulty,
    difficulty,
    gameState,
    isPlaying,
    isPaused,
    togglePause,
    setGameState,
  };
};
