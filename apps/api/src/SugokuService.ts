import type { Board, Difficulty } from '@sudoku/core';
import axios from 'axios';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

import type { SudokuService } from './domain';
import { BoardDto } from './dto/BoardDto';
import { InternalError } from './errors';
import { boardDtoToBoard } from './mappers/boardDtoToBoard';

export class SugokuService implements SudokuService {
  private client = axios.create({ baseURL: 'https://sugoku.herokuapp.com/' });

  createSudoku(diff: Difficulty): Promise<Board | InternalError> {
    return pipe(
      TE.tryCatch(
        () => this.client.get(`board/difficulty=${diff}`),
        () => InternalError,
      ),
      TE.map(BoardDto.validate),
      TE.chain(b =>
        b.success === true ? TE.right(b.value) : TE.left(InternalError),
      ),
      TE.map(boardDtoToBoard),
      TE.toUnion,
    )();
  }
}
