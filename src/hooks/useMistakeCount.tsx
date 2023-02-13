import { BoardCtx } from '@sudoku/context';
import { useContext } from 'react';

export const useMistakeCount = () => {
  const { mistakesCount, setMistakesCount } = useContext(BoardCtx);

  const incMistakesCount = () => setMistakesCount(m => m + 1);

  return { mistakesCount, incMistakesCount };
};
