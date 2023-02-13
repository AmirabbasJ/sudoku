import { TimerCtx } from '@sudoku/context';
import { useContext } from 'react';

export const useTimer = () => {
  const { timer, setTimer } = useContext(TimerCtx);

  return { timer, setTimer };
};
