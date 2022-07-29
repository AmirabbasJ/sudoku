import { parse } from 'dotenv';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { Env } from '../domain/Env';

export const parseEnv = (file: Buffer) =>
  pipe(
    E.tryCatch(
      () => parse(file),
      () => new Error('failed to parse the given env file'),
    ),
    E.map(Env.validate),
    E.chain(res =>
      res.success === true
        ? E.right(res.value)
        : E.left(new Error('failed to parse the given env file')),
    ),
  );
