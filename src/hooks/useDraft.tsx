import { DraftCtx } from '@sudoku/context';
import { useContext } from 'react';

export const useDraft = () => {
  const { isDraftMode, setIsDraftMode } = useContext(DraftCtx);
  const toggleDraftMode = () => setIsDraftMode(!isDraftMode);
  return { isDraftMode, toggleDraftMode };
};
