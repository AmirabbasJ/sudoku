import { useContext } from 'react';

import { TimerCtx } from '../context/TimerCtx';

export const useTimer = () => {
  const { timer, setTimer } = useContext(TimerCtx);

  return { timer, setTimer };
};
