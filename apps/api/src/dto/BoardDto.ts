import type { Static } from 'runtypes';
import { Literal, Tuple, Union } from 'runtypes';

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

export const BoardDto = Tuple(
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

export type BoardDto = Static<typeof BoardDto>;
