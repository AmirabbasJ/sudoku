import { toError } from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import * as fs from 'fs/promises';

export const readFileSync = (path: string): TE.TaskEither<Error, Buffer> => {
  return TE.tryCatch(() => fs.readFile(path), toError);
};
