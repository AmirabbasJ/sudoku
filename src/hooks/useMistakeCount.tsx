import { useContext } from 'react';

import { BoardCtx } from '../context/BoardCtx';

export const useMistakeCount = () => {
  const { mistakesCount, setMistakesCount } = useContext(BoardCtx);

  const incMistakesCount = () => setMistakesCount(m => m + 1);

  return { mistakesCount, incMistakesCount };
};
