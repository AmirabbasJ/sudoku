export type InternalError = 'InternalError';
export const InternalError: InternalError = 'InternalError';

export type BadDifficultyParam = 'bad difficulty param';
export const BadDifficultyParam: BadDifficultyParam = 'bad difficulty param';

export type BadBoard = 'bad board format';
export const BadBoard: BadBoard = 'bad board format';

export type Error = BadBoard | BadDifficultyParam | InternalError;
