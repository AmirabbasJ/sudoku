import type { SolvedSudokuDto } from '@sudoku/core';
import { SolveSudokuDto } from '@sudoku/core';
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

  router.post('/sudoku/solve', async (req, res) => {
    const isValidSudoku = SolveSudokuDto.guard(req.body);
    if (!isValidSudoku) return res.status(400).json({ msg: BadBoard });

    const { currentBoard, originalBoard } = req.body;
    const solvedSudokuOrError = await sudokuService.solveSudoku(originalBoard);
    if (solvedSudokuOrError === InternalError)
      return res.status(500).json({ msg: InternalError });

    const isCorrect = areSameSudoku(currentBoard, solvedSudokuOrError);
    return res.status(200).json({ isCorrect } as SolvedSudokuDto);
  });

  return router;
};
