import * as R from 'ramda';

const isError = (x: unknown): boolean => x instanceof Error;

export const throwErr = (err: unknown): never => {
  throw isError(err) ? err : new Error(R.toString(err));
};
