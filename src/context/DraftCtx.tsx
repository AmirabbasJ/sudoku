import { createContext, useMemo, useState } from 'react';

interface DraftCtx {
  isDraftMode: boolean;
  setIsDraftMode: Setter<boolean>;
}

export const DraftCtx = createContext<DraftCtx | null>(
  null,
) as React.Context<DraftCtx>;

export const DraftCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDraftMode, setIsDraftMode] = useState<boolean>(false);

  const ctx = useMemo(
    (): DraftCtx => ({
      isDraftMode,
      setIsDraftMode,
    }),
    [isDraftMode, setIsDraftMode],
  );

  return <DraftCtx.Provider value={ctx}>{children}</DraftCtx.Provider>;
};
