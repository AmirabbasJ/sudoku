import * as R from 'ramda';
import { useCallback, useContext, useEffect } from 'react';

import { BoardCtx } from '../context/BoardCtx';
import type { Direction } from '../domain/Direction';
import { moveInBoard } from '../domain/Direction';
import type { Id } from '../domain/Id';
import { addToNote, emptyNote } from '../domain/Note';
import type { NumericSlot, Slot } from '../domain/Slot';
import { deleteSlot, editSlot, getCoveredSlotIds, getSlot, isValidSlot } from '../domain/Slot';

export const useBoard = () => {
  const {
    board,
    setBoard,
    mutableIds,
    selectedId,
    setSelectedId,
    mistakeIds,
    setMistakeIds,
    coveredSlotIds,
    setCoveredSlotIds,
    notes,
    setNotes,
  } = useContext(BoardCtx);
  const emptyNotes = () => setNotes(R.assoc(selectedId!, emptyNote, notes));
  const checkMistakes = useCallback(() => {
    const newIds = mistakeIds.filter(id => !isValidSlot(board, id, getSlot(board, id)));
    setMistakeIds(newIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const checkCoveredSlots = useCallback(() => {
    if (selectedId == null) return setCoveredSlotIds([]);
    const ids = getCoveredSlotIds(board, selectedId);
    setCoveredSlotIds(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useEffect(() => checkMistakes(), [board, checkMistakes]);
  useEffect(() => checkCoveredSlots(), [selectedId, checkCoveredSlots]);

  const deleteSelectedSlot = () => {
    // if (isDraftMode) return emptyNotes();
    if (selectedId == null) return;
    const isMutableSlot = mutableIds.includes(selectedId);
    if (!isMutableSlot) return;
    if (getSlot(board, selectedId) === '') return emptyNotes();
    setBoard(deleteSlot(board, selectedId));
  };

  const editSelectedSlot = useCallback(
    (slot: NumericSlot) => {
      if (selectedId == null) return;

      const currSlot = getSlot(board, selectedId);
      const slotIsTheSameAsBefore = slot === currSlot;
      const isEmptySlot = currSlot === '';
      const isMistakeSlot = mistakeIds.includes(selectedId);
      const isMutableSlot = isEmptySlot || mutableIds.includes(selectedId);

      if (slotIsTheSameAsBefore) return;
      if (!isMutableSlot) return;
      if (isMistakeSlot) setMistakeIds(mistakeIds.filter(id => id !== selectedId));

      const [newBoard, state] = editSlot(board, selectedId, slot);
      if (state === 'mistake') setMistakeIds(mistakeIds.concat(selectedId));
      return setBoard(newBoard);
    },
    [board, mistakeIds, mutableIds, selectedId, setBoard, setMistakeIds],
  );

  const moveSelectedSlot = useCallback(
    (dir: Direction) => setSelectedId(selectedId === null ? null : moveInBoard(selectedId, dir)),
    [selectedId, setSelectedId],
  );

  const selectSlot = (isSelected: boolean, id: Id) => setSelectedId(isSelected ? null : id);

  const addNote = (slot: Slot) => {
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
  };
};
