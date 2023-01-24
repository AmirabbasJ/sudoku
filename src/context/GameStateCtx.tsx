import { useLocalStorageState } from 'ahooks';
import { createContext, useMemo, useState } from 'react';

import type { Difficulty } from '../core';

export type GameState = 'error' | 'loading' | 'paused' | 'playing' | 'won';

interface GameStateCtx {
  gameState: GameState;
  setGameState: (b: GameState) => void;

  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
}

export const GameStateCtx = createContext<GameStateCtx | null>(
  null,
) as React.Context<GameStateCtx>;

export const GameStateCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>('loading');
  const [difficulty, setDifficulty] = useLocalStorageState<Difficulty>(
    'difficulty',
    { defaultValue: () => 'easy' },
  );

  const ctx = useMemo(
    (): GameStateCtx => ({
      gameState,
      setGameState,
      difficulty,
      setDifficulty,
    }),
    [gameState, setGameState, difficulty, setDifficulty],
  );

  return <GameStateCtx.Provider value={ctx}>{children}</GameStateCtx.Provider>;
};
