import { useLocalStorageState, useToggle } from 'ahooks';
import { createContext, useCallback, useMemo, useState } from 'react';

import type { Board, Id, Notes } from '../core';
import { emptyBoard } from '../emptyBoard';
import { isEmptyBoard } from '../helpers/isEmptyBoard';
import { useTimer } from '../hooks/useTimer';
import type { Setter } from './Setter';

interface BoardCtx {
  board: Board;
  setBoard: Setter<Board | null>;

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

  isUsingPersistent: boolean;
  setIsUsingPersistent: Setter<boolean>;

  reset: () => void;
}

export const BoardCtx = createContext<BoardCtx | null>(
  null,
) as React.Context<BoardCtx>;

export const BoardCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setTimer } = useTimer();
  const [board, setBoard] = useLocalStorageState<Board>('board', {
    defaultValue: emptyBoard,
  });
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const [mistakeIds, setMistakeIds] = useLocalStorageState<Id[]>('mistakeIds', {
    defaultValue: [],
  });
  const [coveredSlotIds, setCoveredSlotIds] = useState<Id[]>([]);
  const [mutableIds, setMutableIds] = useLocalStorageState<Id[]>('mutableIds');

  const [notes, setNotes] = useLocalStorageState<Notes>('notes');

  const [mistakesCount, setMistakesCount] = useLocalStorageState<number>(
    'mistakeCount',
    { defaultValue: 0 },
  );

  const [isUsingPersistent, setIsUsingPersistent] = useState<boolean>(
    () => !isEmptyBoard(board),
  );

  const reset = useCallback(() => {
    localStorage.clear();
    setBoard(emptyBoard);
    setMistakeIds([]);
    setNotes({});
    setMistakesCount(0);
    setTimer(0);
  }, []);

  const ctx: BoardCtx = useMemo(
    () => ({
      board,
      setBoard: setBoard as Setter<Board | null>,
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
      setMistakesCount: setMistakesCount as Setter<number>,
      isUsingPersistent,
      setIsUsingPersistent,
      reset,
    }),
    [
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
      isUsingPersistent,
      setIsUsingPersistent,
      reset,
    ],
  );

  return <BoardCtx.Provider value={ctx}>{children}</BoardCtx.Provider>;
};
