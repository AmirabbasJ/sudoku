import { createContext, useMemo, useState } from 'react';

export type GameState = 'loading' | 'paused' | 'playing' | 'won';

interface GameStateCtx {
  gameState: GameState;
  setGameState: (b: GameState) => void;
}

export const GameStateCtx = createContext<GameStateCtx | null>(
  null,
) as React.Context<GameStateCtx>;

export const GameStateCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>('loading');

  const ctx = useMemo(
    (): GameStateCtx => ({
      gameState,
      setGameState,
    }),
    [gameState, setGameState],
  );

  return <GameStateCtx.Provider value={ctx}>{children}</GameStateCtx.Provider>;
};
