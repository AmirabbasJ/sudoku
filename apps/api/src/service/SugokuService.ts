import type { Board, Difficulty } from '@sudoku/core';
import axios from 'axios';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

import type { SudokuService } from '../domain';
import { SolvedSugokuDto } from '../dto/SolvedSugokuDto';
import { SugokuDto } from '../dto/SugokuDto';
import { InternalError } from '../errors';
import { boardToSugokuDto } from '../mappers/boardToSugokuDto';
import { solvedSugokuDtoToBoard } from '../mappers/solvedSugokuDtoToBoard';
import { sugokuDtoToBoard } from '../mappers/sugokuDtoToBoard';

export class SugokuService implements SudokuService {
  private client = axios.create({ baseURL: 'https://sugoku.herokuapp.com/' });

  createSudoku(diff: Difficulty): Promise<Board | InternalError> {
    return pipe(
      TE.tryCatch(
        () => this.client.get(`board?difficulty=${diff}`),
        () => InternalError,
      ),
      TE.map(({ data }) => SugokuDto.validate(data)),
      TE.chain(b =>
        b.success === true ? TE.right(b.value) : TE.left(InternalError),
      ),
      TE.map(sugokuDtoToBoard),
      TE.toUnion,
    )();
  }

  solveSudoku(board: Board): Promise<Board | InternalError> {
    return pipe(
      board,
      boardToSugokuDto,
      TE.tryCatchK(
        b => this.client.post('solve', b),
        () => InternalError,
      ),
      TE.map(({ data }) => SolvedSugokuDto.validate(data)),
      TE.chain(b =>
        b.success === true ? TE.right(b.value) : TE.left(InternalError),
      ),
      TE.map(solvedSugokuDtoToBoard),
      TE.toUnion,
    )();
  }
}
