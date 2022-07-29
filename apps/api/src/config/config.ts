import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

import type { Config, Env } from '../domain';
import { throwErr } from '../helpers/throwErr';
import { toInt } from '../helpers/toInt';
import { getEnv } from './getEnv';

const createConfig = (env: Env): Config => ({
  port: toInt(env.PORT ?? '3000'),
});

export const getConfig = pipe(
  getEnv('.env.dev.local'),
  TE.bimap(throwErr, createConfig),
  TE.toUnion,
);
