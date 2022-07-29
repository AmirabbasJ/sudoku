import type { Static } from 'runtypes';
import { Literal, Record, Tuple, Union } from 'runtypes';

const Slot = Union(
  Literal(0),
  Literal(1),
  Literal(2),
  Literal(3),
  Literal(4),
  Literal(5),
  Literal(6),
  Literal(7),
  Literal(8),
  Literal(9),
);

export const Sugoku = Tuple(
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
  Tuple(Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot),
);

export const SugokuDto = Record({
  board: Sugoku,
});

export type SugokuDto = Static<typeof SugokuDto>;
