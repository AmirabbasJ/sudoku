import { BoardCtx } from '@sudoku/context';
import type { Difficulty, Direction, Id, Numeric, Slot } from '@sudoku/core';
import {
  deleteSlot,
  editNote,
  editSlot,
  getCoveredSlotIds,
  getSlot,
  isPrefilled,
  isUnfilled,
  isValid,
  moveInBoard,
  UnfilledSlot,
} from '@sudoku/core';
import { createSudoku } from '@sudoku/services';
import { useUpdateEffect } from 'ahooks';
import { useContext, useEffect } from 'react';

import { useGameState } from './useGameState';
import { useMistakeCount } from './useMistakeCount';
import { useTimer } from './useTimer';

// NOTE
// I have an idea
// we create a toBoard which also assigns the id in the slot

export const useSudoku = () => {
  const {
    board,
    setBoard,
    selectedId,
    setSelectedId,
    coveredSlotIds,
    setCoveredSlotIds,

    setSolved,
    solved,
    setMistakesCount,
    difficulty,
    setDifficulty,
  } = useContext(BoardCtx);

  const { incMistakesCount } = useMistakeCount();
  const { isPlaying, gameState, setGameState } = useGameState();

  useEffect(() => {
    console.log('Game State is: ', gameState);
  }, [gameState]);

  const { setTimer } = useTimer();

  const reset = () => {
    localStorage.clear();
    setMistakesCount(0);
    setTimer(0);
  };

  const newGame = (d: Difficulty) => {
    reset();
    const { board: newBoard, solved: newSolved } = createSudoku(difficulty);
    setBoard(newBoard);
    setSolved(newSolved);
    setDifficulty(d);
  };

  const emptyNotes = () => {
    if (selectedId == null) return;
    const slot = getSlot(board, selectedId);
    if (!isUnfilled(slot)) return;
    setBoard(editSlot(board, selectedId, UnfilledSlot));
  };

  const isValidSlot = (id: Id, value: Numeric): boolean => {
    return getSlot(solved, id).value === value;
  };

  const checkWin = () => {
    const slots = board.flat(3);
    const isGameWon = slots.every(slot => isPrefilled(slot) || isValid(slot));
    if (isGameWon) return setGameState('won');
  };

  const checkCoveredSlots = () => {
    if (selectedId == null) return setCoveredSlotIds([]);
    const ids = getCoveredSlotIds(board, selectedId);
    setCoveredSlotIds(ids);
  };

  useUpdateEffect(() => {
    checkWin();
  }, [board]);

  useEffect(() => {
    checkCoveredSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const deleteSelectedSlot = () => {
    if (!isPlaying) return;
    if (selectedId == null) return;
    const slot = getSlot(board, selectedId);
    if (isPrefilled(slot)) return;
    if (isUnfilled(slot)) return emptyNotes();
    setBoard(deleteSlot(board, selectedId));
  };

  const editSelectedSlot = (value: Numeric) => {
    if (!isPlaying) return;
    if (selectedId == null) return;
    const slot = getSlot(board, selectedId);
    const didSlotChange = value !== slot.value;
    if (!didSlotChange) return;
    if (isPrefilled(slot) || isValid(slot)) return;
    const valid = isValidSlot(selectedId, value);
    if (!valid) incMistakesCount();
    const newSlot: Slot = valid
      ? { state: 'valid', value }
      : { state: 'invalid', value };
    const updatedBoard = editSlot(board, selectedId, newSlot);
    return setBoard(updatedBoard);
  };

  const moveSelectedSlot = (dir: Direction) => {
    if (!isPlaying) return;
    setSelectedId(selectedId === null ? null : moveInBoard(selectedId, dir));
  };

  const selectSlot = (id: Id | null) => {
    if (!isPlaying || id === null) return setSelectedId(null);
    setSelectedId(id === selectedId ? null : id);
  };

  const addNote = (value: Numeric) => {
    if (!isPlaying) return;
    if (selectedId == null) return;
    const slot = getSlot(board, selectedId);
    if (!isUnfilled(slot)) return;

    const updatedBoard = editSlot(board, selectedId, editNote(value, slot));
    return setBoard(updatedBoard);
  };

  return {
    board,
    selectedId,
    editSelectedSlot,
    moveSelectedSlot,
    selectSlot,
    deleteSelectedSlot,
    coveredSlotIds,
    addNote,
    emptyNotes,
    newGame,
  };
};
