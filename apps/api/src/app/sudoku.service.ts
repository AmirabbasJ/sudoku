import { Injectable } from '@nestjs/common';

@Injectable()
export class SudokuService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }
}
