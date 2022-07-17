/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useMemo, useState } from 'react';

import type { Id } from '../domain/Id';

interface MistakeIdsCtx {
  mistakeIds: Id[];
  setMistakeIds: (i: Id[]) => void;
}

export const MistakeIdsCtx = createContext<MistakeIdsCtx>({
  mistakeIds: [],
  setMistakeIds: () => {},
});

export const MistakeIdsCtxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mistakeIds, setMistakeIds] = useState<Id[]>([]);

  const ctx = useMemo(() => ({ mistakeIds, setMistakeIds }), [mistakeIds]);

  return <MistakeIdsCtx.Provider value={ctx}>{children}</MistakeIdsCtx.Provider>;
};
