import { Test } from '@nestjs/testing';

import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
  // eslint-disable-next-line fp/no-let
  let service: SudokuService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [SudokuService],
    }).compile();

    service = app.get<SudokuService>(SudokuService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
