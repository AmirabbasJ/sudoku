/* eslint-disable max-lines-per-function */
import type {
  Board,
  Difficulty,
  Direction,
  Id,
  NumericSlot,
  Slot,
} from '@sudoku/core';
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
import { useUpdateEffect } from 'ahooks';
import * as R from 'ramda';
import { useCallback, useContext, useEffect } from 'react';

import { BoardCtx } from '../context/BoardCtx';
import { emptyBoard } from '../emptyBoard';
import { getSampleBoard } from '../getSampleBoard';
// import { fetchSudoku } from '../helpers/fetchSudoku';
import { useGameState } from './useGameState';
import { useMistakeCount } from './useMistakeCount';

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
    isUsingPersistent,
    setIsUsingPersistent,
    reset,
  } = useContext(BoardCtx);

  const { incMistakesCount } = useMistakeCount();
  const { isPaused, isPlaying, setGameState, difficulty, setDifficulty } =
    useGameState();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery<Board>(
    ['board', difficulty],
    () => getSampleBoard(difficulty),
    { enabled: !isUsingPersistent },
  );

  const newGame = (d: Difficulty) => {
    setIsUsingPersistent(false);
    reset();
    setDifficulty(d);
    refetch();
    setGameState('loading');
  };

  useEffect(() => {
    if (isSuccess) {
      setIsUsingPersistent(true);
      setGameState('playing');
      setBoard(data);
      setMutableIds(getMutableSlotIds(data));
      setNotes(
        getMutableSlotIds(data).reduce(
          (acc, id) => ({ ...acc, [id]: emptyNote }),
          {},
        ),
      );
    }
  }, [
    isSuccess,
    data,
    setBoard,
    setMutableIds,
    setNotes,
    setIsUsingPersistent,
    setGameState,
  ]);

  useEffect(() => {
    setGameState(
      !isUsingPersistent && isLoading
        ? 'loading'
        : isError
        ? 'error'
        : isPaused
        ? 'paused'
        : 'playing',
    );
  }, [isLoading, setGameState, isError, isPaused, isUsingPersistent]);

  const emptyNotes = () => {
    if (selectedId != null) setNotes(R.assoc(selectedId, emptyNote, notes));
  };

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

  useUpdateEffect(() => {
    checkMistakes();
  }, [board]);

  useEffect(() => checkCoveredSlots(), [selectedId, checkCoveredSlots]);

  const deleteSelectedSlot = () => {
    if (!isPlaying) return;
    if (selectedId == null) return;
    const isMutableSlot = mutableIds.includes(selectedId);
    if (!isMutableSlot) return;
    if (getSlot(board, selectedId) === '') return emptyNotes();
    setBoard(deleteSlot(board, selectedId));
  };

  const editSelectedSlot = useCallback(
    (slot: NumericSlot) => {
      if (!isPlaying) return;
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
      isPlaying,
      mistakeIds,
      mutableIds,
      selectedId,
      setBoard,
      setMistakeIds,
    ],
  );

  const moveSelectedSlot = useCallback(
    (dir: Direction) => {
      if (!isPlaying) return;
      setSelectedId(selectedId === null ? null : moveInBoard(selectedId, dir));
    },
    [isPlaying, selectedId, setSelectedId],
  );

  const selectSlot = useCallback(
    (id: Id | null) => {
      if (!isPlaying || id === null) return setSelectedId(null);
      setSelectedId(id === selectedId ? null : id);
    },
    [isPlaying, selectedId, setSelectedId],
  );

  useEffect(() => {
    if (!isPlaying) selectSlot(null);
  }, [isPlaying, selectSlot]);

  const addNote = (slot: Slot) => {
    if (!isPlaying) return;
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
    newGame,
  };
};
