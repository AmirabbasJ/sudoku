import type { Board, Id, Notes } from '@sudoku/core';
import { emptyNote, getMutableSlotIds } from '@sudoku/core';
import { createContext, useMemo, useState } from 'react';

import { getLoadingBoard } from '../getLoadingBoard';

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
}

export const BoardCtx = createContext<BoardCtx | null>(
  null,
) as React.Context<BoardCtx>;

const initBoard = getLoadingBoard();

export const BoardCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Board>(initBoard);
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const [mistakeIds, setMistakeIds] = useState<Id[]>([]);
  const [coveredSlotIds, setCoveredSlotIds] = useState<Id[]>([]);
  const [mutableIds, setMutableIds] = useState<Id[]>(() =>
    getMutableSlotIds(board),
  );

  const [notes, setNotes] = useState<Notes>(() =>
    mutableIds.reduce((acc, id) => ({ ...acc, [id]: emptyNote }), {}),
  );
  const [mistakesCount, setMistakesCount] = useState<number>(0);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const ctx: BoardCtx = {
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
