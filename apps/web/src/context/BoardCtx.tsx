import type { Board, Id, Notes } from '@sudoku/core';
import { emptyNote, getMutableSlotIds } from '@sudoku/core';
import { useLocalStorageState } from 'ahooks';
import { createContext, useState } from 'react';

import { getLoadingBoard } from '../getLoadingBoard';
import { isLoadingBoard } from '../helpers/isLoadingBoard';

interface BoardCtx {
  board: Board;
  setBoard: (b: Board) => void;

  selectedId: Id | null;
  setSelectedId: (i: Id | null) => void;

  mistakeIds: Id[];
  setMistakeIds: (i: Id[]) => void;

  coveredSlotIds: Id[];
  setCoveredSlotIds: (i: Id[]) => void;

  mutableIds: Id[];
  setMutableIds: (m: Id[]) => void;

  notes: Notes;
  setNotes: (n: Notes) => void;

  mistakesCount: number;
  setMistakesCount: (n: number) => void;

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
    setBoard,
    selectedId,
    setSelectedId,
    mutableIds,
    setMutableIds,
    mistakeIds,
    setMistakeIds,
    coveredSlotIds,
    setCoveredSlotIds,
    notes,
    setNotes,
    mistakesCount,
    setMistakesCount,
  };

  return <BoardCtx.Provider value={ctx}>{children}</BoardCtx.Provider>;
};
