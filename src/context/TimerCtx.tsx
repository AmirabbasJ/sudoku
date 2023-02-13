import { useLocalStorageState } from 'ahooks';
import { createContext, useMemo } from 'react';

interface TimerCtx {
  timer: number;
  setTimer: Setter<number>;
}

export const TimerCtx = createContext<TimerCtx | null>(
  null,
) as React.Context<TimerCtx>;

export const TimerCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timer, setTimer] = useLocalStorageState('timer', {
    defaultValue: 0,
  });

  const ctx = useMemo(
    (): TimerCtx => ({
      timer,
      setTimer: setTimer as Setter<number>,
    }),
    [timer, setTimer],
  );

  return <TimerCtx.Provider value={ctx}>{children}</TimerCtx.Provider>;
};
