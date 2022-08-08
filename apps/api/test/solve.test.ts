import { getSampleBoard, getSolvedSamples, setBoard } from '@sudoku/core';
import request from 'supertest';

import { MockApp } from './AppMock';

describe('/api/sudoku/solve', () => {
  const app = MockApp.init().getExpressInstance();
  const cases = [
    { difficulty: 'easy' },
    { difficulty: 'medium' },
    { difficulty: 'hard' },
  ] as const;
  it.each(cases)(
    'should be correct when $difficulty sudoku is solved correctly',
    async ({ difficulty }) => {
      const res = await request(app)
        .post('/api/sudoku/solve')
        .send({
          originalBoard: getSampleBoard(difficulty),
          currentBoard: getSolvedSamples(difficulty),
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body?.isCorrect).toBe(true);
    },
  );

  it.each(cases)(
    'should be incorrect when $difficulty sudoku is solved incorrectly',
    async ({ difficulty }) => {
      const res = await request(app)
        .post('/api/sudoku/solve')
        .send({
          originalBoard: getSampleBoard(difficulty),
          currentBoard: setBoard(getSampleBoard(difficulty), '0-0-0-0', 3),
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body?.isCorrect).toBe(false);
    },
  );
});
