import { createContext, useMemo, useState } from 'react';

interface GameStateCtx {
  isPaused: boolean;
  setIsPaused: (b: boolean) => void;
}

export const GameStateCtx = createContext<GameStateCtx | null>(
  null,
) as React.Context<GameStateCtx>;

export const GameStateCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const ctx = useMemo(
    (): GameStateCtx => ({
      isPaused,
      setIsPaused,
    }),
    [isPaused, setIsPaused],
  );

  return <GameStateCtx.Provider value={ctx}>{children}</GameStateCtx.Provider>;
};
