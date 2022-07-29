import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import type { Config, Env } from '../domain';
import { throwErr } from '../helpers/throwErr';
import { toInt } from '../helpers/toInt';
import { getEnv } from './getEnv';

const createConfig = (env: Env): Config => ({
  port: toInt(env.PORT ?? '3000'),
});

export const getConfig = () =>
  pipe(getEnv(), E.bimap(throwErr, createConfig), E.toUnion);
