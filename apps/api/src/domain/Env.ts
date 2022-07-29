import type { Static } from 'runtypes';
import { Nullish, Record, String, Union } from 'runtypes';

export const Env = Record({
  PORT: Union(String, Nullish),
});

export type Env = Static<typeof Env>;
