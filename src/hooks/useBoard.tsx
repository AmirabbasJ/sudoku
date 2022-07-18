import { useCallback, useContext, useEffect } from 'react';

import { BoardCtx } from '../context/BoardCtx';
import type { Direction } from '../domain/Direction';
import { moveInBoard } from '../domain/Direction';
import type { Id } from '../domain/Id';
import type { NumericSlot } from '../domain/Slot';
import { deleteSlot, editSlot, getSlot, isValidSlot, Slot } from '../domain/Slot';

export const useBoard = () => {
  const { board, setBoard, mutableIds, selectedId, setSelectedId, mistakeIds, setMistakeIds } = useContext(BoardCtx);

  const recheckMistakeValidity = useCallback(() => {
    const newIds = mistakeIds.filter(id => !isValidSlot(board, id, getSlot(board, id)));
    setMistakeIds(newIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => recheckMistakeValidity(), [board, recheckMistakeValidity]);

  const deleteSelectedSlot = () => {
    if (selectedId == null) return;
    const isMutableSlot = mutableIds.includes(selectedId);
    if (!isMutableSlot) return;
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

  return {
    board,
    mutableIds,
    selectedId,
    mistakeIds,
    editSelectedSlot,
    moveSelectedSlot,
    selectSlot,
    deleteSelectedSlot,
  };
};
