import type { Board, Difficulty } from '@sudoku/core';
import axios from 'axios';

export const fetchSudoku = (diff: Difficulty) =>
  axios.get(`api/sudoku/${diff}`).then(({ data }) => data.sudoku as Board);
