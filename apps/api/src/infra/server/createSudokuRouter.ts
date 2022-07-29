import express from 'express';

import type { SudokuService } from '../../domain';
import { parseDifficulty } from '../../domain/parseDifficulty';
import { InternalError } from '../../errors';

export const createSudokuRouter = (sudokuService: SudokuService) => {
  const router = express.Router();

  return router.post('/getBoard/:difficulty', async (req, res) => {
    const difficulty = parseDifficulty(req.params.difficulty);
    if (difficulty == null)
      return res.status(401).json({ msg: 'badDifficulty' });
    const boardOrError = await sudokuService.createSudoku(difficulty);
    if (boardOrError === InternalError)
      return res.status(400).json({ msg: InternalError });
    return res.json({ board: boardOrError });
  });
};
