import { GameStateCtx } from '@sudoku/context';
import { useContext } from 'react';

export const useGameState = () => {
  const { gameState, setGameState } = useContext(GameStateCtx);

  const isPaused = gameState === 'paused';
  const isPlaying = gameState === 'playing';
  const isWon = gameState === 'won';

  const togglePause = () => {
    if (!isWon) setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  return {
    gameState,
    isPlaying,
    isPaused,
    isWon,
    togglePause,
    setGameState,
  };
};
