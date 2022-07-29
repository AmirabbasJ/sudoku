import { Board } from '@sudoku/core';
import express from 'express';

import type { SudokuService } from '../../domain';
import { parseDifficulty } from '../../domain/parseDifficulty';
import { BadBoard, BadDifficultyParam, InternalError } from '../../errors';
import { areSameSudoku } from '../../helpers/';

export const createSudokuRouter = (sudokuService: SudokuService) => {
  const router = express.Router();

  router.get('/sudoku/:difficulty', async (req, res) => {
    const difficulty = parseDifficulty(req.params.difficulty);
    if (difficulty == null)
      return res.status(400).json({ msg: BadDifficultyParam });

    const sudokuOrError = await sudokuService.createSudoku(difficulty);
    if (sudokuOrError === InternalError)
      return res.status(500).json({ msg: InternalError });

    return res.json({ sudoku: sudokuOrError });
  });

  router.post('sudoku/solve', async (req, res) => {
    const sudokuValidation = Board.validate(req.body.board);
    if (!sudokuValidation.success)
      return res.status(401).json({ msg: BadBoard });

    const sudoku = sudokuValidation.value;
    const solvedSudokuOrError = await sudokuService.solveSudoku(sudoku);
    if (solvedSudokuOrError === InternalError)
      return res.status(500).json({ msg: InternalError });

    const isCorrect = areSameSudoku(sudoku, solvedSudokuOrError);
    return { isCorrect };
  });

  return router;
};
