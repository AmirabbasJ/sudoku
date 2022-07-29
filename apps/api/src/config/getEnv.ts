import { flow } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

import { parseEnv } from '../helpers/parseEnv';
import { readFileSync } from '../helpers/readFileSync';

export const getEnv = flow(readFileSync, TE.chainEitherKW(parseEnv));
