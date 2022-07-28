import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SudokuService } from './sudoku.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SudokuService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
