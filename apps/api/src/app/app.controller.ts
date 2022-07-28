import { Controller, Get } from '@nestjs/common';

import type { SudokuService } from './sudoku.service';

@Controller()
export class AppController {
  constructor(private readonly sudokuService: SudokuService) {}

  @Get()
  getData() {
    return this.sudokuService.getData();
  }
}
