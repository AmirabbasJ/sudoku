import type { Board, Id, Notes } from '@sudoku/core';
import { emptyNote, getMutableSlotIds } from '@sudoku/core';
import { useLocalStorageState } from 'ahooks';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import { getLoadingBoard } from '../getLoadingBoard';
import { isLoadingBoard } from '../helpers/isLoadingBoard';

type Setter<T> = (value: T | ((x: T) => T)) => void;
interface BoardCtx {
  board: Board;
  setBoard: Setter<Board>;

  selectedId: Id | null;
  setSelectedId: Setter<Id | null>;

  mistakeIds: Id[];
  setMistakeIds: Setter<Id[]>;

  coveredSlotIds: Id[];
  setCoveredSlotIds: Setter<Id[]>;

  mutableIds: Id[];
  setMutableIds: Setter<Id[]>;

  notes: Notes;
  setNotes: Setter<Notes>;

  mistakesCount: number;
  setMistakesCount: Setter<number>;

  isPersisted: boolean;
}

export const BoardCtx = createContext<BoardCtx | null>(
  null,
) as React.Context<BoardCtx>;

export const BoardCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useLocalStorageState<Board>('board', {
    defaultValue: () => getLoadingBoard(),
  });
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const [mistakeIds, setMistakeIds] = useLocalStorageState<Id[]>('mistakeIds', {
    defaultValue: [],
  });
  const [coveredSlotIds, setCoveredSlotIds] = useState<Id[]>([]);
  const [mutableIds, setMutableIds] = useLocalStorageState<Id[]>('mutableIds', {
    defaultValue: () => getMutableSlotIds(board),
  });

  const [notes, setNotes] = useLocalStorageState<Notes>('notes', {
    defaultValue: () =>
      mutableIds.reduce((acc, id) => ({ ...acc, [id]: emptyNote }), {}),
  });

  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const isPersisted = !isLoadingBoard(board);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const ctx: BoardCtx = {
    isPersisted,
    board,
    setBoard: setBoard as Setter<Board>,
    selectedId,
    setSelectedId,
    mutableIds,
    setMutableIds: setMutableIds as Setter<Id[]>,
    mistakeIds,
    setMistakeIds: setMistakeIds as Setter<Id[]>,
    coveredSlotIds,
    setCoveredSlotIds,
    notes,
    setNotes: setNotes as Setter<Notes>,
    mistakesCount,
    setMistakesCount,
  };

  return <BoardCtx.Provider value={ctx}>{children}</BoardCtx.Provider>;
};
