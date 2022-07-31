/* eslint-disable max-lines-per-function */
import type { Board, Direction, Id, NumericSlot, Slot } from '@sudoku/core';
import {
  addToNote,
  deleteSlot,
  editSlot,
  emptyNote,
  getCoveredSlotIds,
  getMutableSlotIds,
  getSlot,
  isValidSlot,
  moveInBoard,
} from '@sudoku/core';
import { useQuery } from '@tanstack/react-query';
import * as R from 'ramda';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDidUpdate } from 'rooks';

import { BoardCtx } from '../context/BoardCtx';
import { getBoard } from '../getLoadingBoard';
import { fetchSudoku } from '../helpers/fetchSudoku';
import { useGameState } from './useGameState';
import { usePersistentSudoku } from './usePersistentSudoku';

// TODO separate some parts to make it a smaller hook

export const useSudoku = () => {
  const {
    board,
    setBoard,
    mutableIds,
    setMutableIds,
    selectedId,
    setSelectedId,
    mistakeIds,
    setMistakeIds,
    coveredSlotIds,
    setCoveredSlotIds,
    notes,
    setNotes,
    mistakesCount,
    setMistakesCount,
  } = useContext(BoardCtx);

  const { isPaused, setGameState } = useGameState();
  const { persistentSudokuExists } = usePersistentSudoku();

  const { data, isLoading, isSuccess } = useQuery<Board>(['board'], getBoard, {
    enabled: !persistentSudokuExists(),
  });

  useEffect(() => {
    if (isSuccess) {
      setBoard(data);
      setMutableIds(getMutableSlotIds(data));
    }
  }, [isSuccess, data, setBoard, setMutableIds]);

  useEffect(() => {
    setGameState(
      !persistentSudokuExists() && isLoading ? 'loading' : 'playing',
    );
  }, [isLoading, persistentSudokuExists, setGameState]);

  const incMistakesCount = useCallback(
    () => setMistakesCount(mistakesCount + 1),
    [mistakesCount, setMistakesCount],
  );

  const emptyNotes = () => setNotes(R.assoc(selectedId!, emptyNote, notes));

  const checkMistakes = useCallback(() => {
    const newIds = mistakeIds.filter(
      id => !isValidSlot(board, id, getSlot(board, id)),
    );
    setMistakeIds(newIds);
  }, [board, mistakeIds, setMistakeIds]);

  const checkCoveredSlots = useCallback(() => {
    if (selectedId == null) return setCoveredSlotIds([]);
    const ids = getCoveredSlotIds(board, selectedId);
    setCoveredSlotIds(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useDidUpdate(() => {
    checkMistakes();
  }, [board]);

  useEffect(() => checkCoveredSlots(), [selectedId, checkCoveredSlots]);

  const deleteSelectedSlot = () => {
    if (isPaused) return;
    if (selectedId == null) return;
    const isMutableSlot = mutableIds.includes(selectedId);
    if (!isMutableSlot) return;
    if (getSlot(board, selectedId) === '') return emptyNotes();
    setBoard(deleteSlot(board, selectedId));
  };

  const editSelectedSlot = useCallback(
    (slot: NumericSlot) => {
      if (isPaused) return;
      if (selectedId == null) return;

      const currSlot = getSlot(board, selectedId);
      const slotIsTheSameAsBefore = slot === currSlot;
      const isEmptySlot = currSlot === '';
      const isMistakeSlot = mistakeIds.includes(selectedId);
      const isMutableSlot = isEmptySlot || mutableIds.includes(selectedId);

      if (slotIsTheSameAsBefore) return;
      if (!isMutableSlot) return;
      if (isMistakeSlot)
        setMistakeIds(mistakeIds.filter(id => id !== selectedId));

      const [newBoard, state] = editSlot(board, selectedId, slot);
      if (state === 'mistake') {
        setMistakeIds(mistakeIds.concat(selectedId));
        incMistakesCount();
      }
      return setBoard(newBoard);
    },
    [
      board,
      incMistakesCount,
      isPaused,
      mistakeIds,
      mutableIds,
      selectedId,
      setBoard,
      setMistakeIds,
    ],
  );

  const moveSelectedSlot = useCallback(
    (dir: Direction) => {
      if (isPaused) return;
      setSelectedId(selectedId === null ? null : moveInBoard(selectedId, dir));
    },
    [isPaused, selectedId, setSelectedId],
  );

  const selectSlot = useCallback(
    (id: Id | null) => {
      if (isPaused || id === null) return setSelectedId(null);
      setSelectedId(id === selectedId ? null : id);
    },
    [isPaused, selectedId, setSelectedId],
  );

  useEffect(() => {
    if (isPaused) selectSlot(null);
  }, [isPaused, selectSlot]);

  const addNote = (slot: Slot) => {
    if (isPaused) return;
    if (selectedId == null) return;
    const isCurrentSlotEmpty = getSlot(board, selectedId) === '';
    if (!isCurrentSlotEmpty) return;
    const note = notes[selectedId] ?? emptyNote;
    return setNotes(R.assoc(selectedId, addToNote(note, slot), notes));
  };

  return {
    board,
    mutableIds,
    selectedId,
    mistakeIds,
    editSelectedSlot,
    moveSelectedSlot,
    selectSlot,
    deleteSelectedSlot,
    coveredSlotIds,
    notes,
    addNote,
    emptyNotes,
    mistakesCount,
  };
};
