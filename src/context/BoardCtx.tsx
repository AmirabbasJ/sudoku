import type { Board, Difficulty, Id } from '@sudoku/core';
import { useLocalStorageState } from 'ahooks';
import { createContext, useMemo, useState } from 'react';

import { createSudoku } from '../services';

interface BoardCtx {
  board: Board;
  setBoard: Setter<Board | null>;

  solved: Board;
  setSolved: Setter<Board | null>;

  selectedId: Id | null;
  setSelectedId: Setter<Id | null>;

  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;

  coveredSlotIds: Id[];
  setCoveredSlotIds: Setter<Id[]>;

  mistakesCount: number;
  setMistakesCount: Setter<number>;
}

export const BoardCtx = createContext<BoardCtx | null>(
  null,
) as React.Context<BoardCtx>;

export const BoardCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [difficulty, setDifficulty] = useLocalStorageState<Difficulty>(
    'difficulty',
    {
      defaultValue: () => {
        localStorage.setItem('difficulty', 'easy');
        return 'easy';
      },
    },
  );
  const { board: initBoard, solved: initSolved } = useMemo(
    () => createSudoku(difficulty),
    [],
  );

  const [board, setBoard] = useLocalStorageState<Board>('board', {
    defaultValue: () => {
      localStorage.setItem('board', JSON.stringify(initBoard));
      return initBoard;
    },
  });
  const [solved, setSolved] = useLocalStorageState<Board>('solved', {
    defaultValue: () => {
      localStorage.setItem('solved', JSON.stringify(initSolved));

      return initSolved;
    },
  });

  const [selectedId, setSelectedId] = useState<Id | null>(null);

  const [coveredSlotIds, setCoveredSlotIds] = useState<Id[]>([]);

  const [mistakesCount, setMistakesCount] = useLocalStorageState<number>(
    'mistakeCount',
    { defaultValue: 0 },
  );

  const ctx: BoardCtx = useMemo(
    () => ({
      board,
      solved,
      setSolved: setSolved as Setter<Board | null>,
      setMistakesCount: setMistakesCount as Setter<number>,
      difficulty,
      setDifficulty,
      setBoard: setBoard as Setter<Board | null>,
      selectedId,
      setSelectedId,
      coveredSlotIds,
      setCoveredSlotIds,
      mistakesCount,
    }),
    [
      board,
      setBoard,
      selectedId,
      setMistakesCount,
      difficulty,
      setDifficulty,
      setSelectedId,
      setSolved,
      solved,
      coveredSlotIds,
      setCoveredSlotIds,
      mistakesCount,
    ],
  );

  return <BoardCtx.Provider value={ctx}>{children}</BoardCtx.Provider>;
};
