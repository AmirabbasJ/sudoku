import { useContext } from 'react';
import { useDidMount, useDidUpdate } from 'rooks';

import { BoardCtx } from '../context/BoardCtx';

export const usePersistentSudoku = () => {
  const {
    board,
    setBoard,
    mutableIds,
    setMutableIds,
    mistakeIds,
    setMistakeIds,
    notes,
    setNotes,
    mistakesCount,
    setMistakesCount,
  } = useContext(BoardCtx);

  const persistentSudokuExists = () => {
    return localStorage.getItem('isPersistent') === 'true';
  };

  const setPersistentSudoku = () => {
    setBoard(JSON.parse(localStorage.getItem('board') as string));
    setMutableIds(JSON.parse(localStorage.getItem('mutableIds') as string));
    setMistakeIds(JSON.parse(localStorage.getItem('mistakeIds') as string));
    setNotes(JSON.parse(localStorage.getItem('notes') as string));
    setMistakesCount(
      JSON.parse(localStorage.getItem('mistakesCount') as string),
    );
  };

  const persistSudoku = () => {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('mutableIds', JSON.stringify(mutableIds));
    localStorage.setItem('mistakeIds', JSON.stringify(mistakeIds));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('mistakesCount', JSON.stringify(mistakesCount));
    localStorage.setItem('isPersistent', 'true');
  };

  useDidMount(() => {
    if (persistentSudokuExists()) setPersistentSudoku();
  });

  useDidUpdate(() => {
    persistSudoku();
  }, [board, mutableIds, mistakeIds, notes, mistakesCount, persistSudoku]);

  return { persistentSudokuExists };
};
