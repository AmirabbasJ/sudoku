import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { Env } from '../domain/Env';

export const parseEnv = (obj: unknown) =>
  pipe(
    E.right(obj),
    E.map(Env.validate),
    E.chain(res =>
      res.success === true
        ? E.right(res.value)
        : E.left(new Error('failed to parse the given env file')),
    ),
  );
