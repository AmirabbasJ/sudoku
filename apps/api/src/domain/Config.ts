import type { Static } from 'runtypes';
import { Number, Record } from 'runtypes';

export const Config = Record({
  port: Number,
});

export type Config = Static<typeof Config>;
