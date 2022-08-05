import type { Express } from 'express';
import express, { json } from 'express';

import type { Config, SudokuService } from '../../domain';
import { createSudokuRouter } from './createSudokuRouter';

export class App {
  private app!: Express;
  constructor(private config: Config, private sudokuService: SudokuService) {
    this.config = config;
    this.sudokuService = sudokuService;
  }

  init(): App {
    this.app = express();
    this.app.use(json());
    this.app.use('/api', createSudokuRouter(this.sudokuService));
    return this;
  }

  run(): void {
    const server = this.app.listen(this.config.port, () => {
      console.log(`Listening at http://localhost:${this.config.port}/api`);
    });
    server.on('error', console.error);
  }

  getExpressInstance() {
    return this.app;
  }
}
