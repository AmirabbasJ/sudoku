import { createContext, useMemo, useState } from 'react';

import type { Board } from '../domain/Board';
import type { Id } from '../domain/Id';
import type { Notes } from '../domain/Note';
import { emptyNote } from '../domain/Note';
import { getMutableSlotIds } from '../domain/Slot';
import { getBoard } from '../getBoard';

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

  notes: Notes;
  setNotes: (n: Notes) => void;

  mistakesCount: number;
  setMistakesCount: (n: number) => void;
}

export const BoardCtx = createContext<BoardCtx | null>(null) as React.Context<BoardCtx>;

const initBoard = getBoard();

export const BoardCtxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState(initBoard);
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const [mistakeIds, setMistakeIds] = useState<Id[]>([]);
  const [coveredSlotIds, setCoveredSlotIds] = useState<Id[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mutableIds = useMemo(() => getMutableSlotIds(board), []);

  const [notes, setNotes] = useState<Notes>(() => mutableIds.reduce((acc, id) => ({ ...acc, [id]: emptyNote }), {}));
  const [mistakesCount, setMistakesCount] = useState<number>(0);

  const ctx = useMemo(
    (): BoardCtx => ({
      board,
      setBoard,
      selectedId,
      setSelectedId,
      mutableIds,
      mistakeIds,
      setMistakeIds,
      coveredSlotIds,
      setCoveredSlotIds,
      notes,
      setNotes,
      mistakesCount,
      setMistakesCount,
    }),
    [
      board,
      selectedId,
      mutableIds,
      mistakeIds,
      coveredSlotIds,
      setCoveredSlotIds,
      notes,
      setNotes,
      mistakesCount,
      setMistakesCount,
    ],
  );

  return <BoardCtx.Provider value={ctx}>{children}</BoardCtx.Provider>;
};
