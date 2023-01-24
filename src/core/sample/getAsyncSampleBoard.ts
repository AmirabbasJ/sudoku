import type { Difficulty } from '../Difficulty';
import { getSampleBoard } from './getSampleBoard';

export const getAsyncSampleBoard = async (diff: Difficulty) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
  return getSampleBoard(diff);
};
