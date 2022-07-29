import type { Static } from 'runtypes';
import { Record } from 'runtypes';

import { Sugoku } from './SugokuDto';

export const SolvedSugokuDto = Record({ solution: Sugoku });

export type SolvedSugokuDto = Static<typeof SolvedSugokuDto>;
