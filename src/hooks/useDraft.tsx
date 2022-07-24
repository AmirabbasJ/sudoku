import { useContext } from 'react';

import { DraftCtx } from '../context/DraftContext';

export const useDraft = () => {
  const { isDraftMode, setIsDraftMode } = useContext(DraftCtx);
  const toggleDraftMode = () => setIsDraftMode(!isDraftMode);
  return { isDraftMode, toggleDraftMode };
};
