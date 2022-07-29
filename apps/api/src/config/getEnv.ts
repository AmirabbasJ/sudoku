import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { parseEnv } from '../helpers/parseEnv';

export const getEnv = () =>
  pipe(
    parseEnv({
      PORT: process.env['PORT'],
    }),
    E.chain(parseEnv),
  );
