import type { Id, Slot as SlotT } from '@sudoku/core';
import { isInvalid, isPrefilled, isUnfilled } from '@sudoku/core';
import styled from 'styled-components';

export interface SlotProps {
  isSelected?: boolean;
  invalid?: boolean;
  prefilled?: boolean;
  isCoveredSlot?: boolean;
  hasSameContent?: boolean;
}
export const BaseSlot = styled.div<SlotProps>`
  width: 4rem;
  height: 4rem;
  background-color: ${({
    isSelected = false,
    invalid = false,
    isCoveredSlot = false,
    hasSameContent = false,
    theme,
  }) =>
    isSelected
      ? theme.primaryEmphasized
      : invalid
      ? theme.bgError
      : hasSameContent
      ? theme.secondaryActive
      : isCoveredSlot
      ? theme.secondaryHover
      : theme.bgSubtle};
  color: ${({ invalid = false, prefilled = false, theme }) =>
    invalid ? theme.error : prefilled ? theme.textPrimary : theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
  cursor: pointer;
  outline: none;
`;

const NoteSlot = styled(BaseSlot)`
  display: grid;
  font-size: 0.8em;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Note = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textMuted};
`;

interface Props {
  id: Id;
  slot: SlotT;
  isSelected: boolean;
  isCoveredSlot: boolean;
  hasSameContent: boolean;
  onClick?: () => void;
}

export const Slot = ({ id, slot, ...rest }: Props) => {
  if (isUnfilled(slot))
    return (
      <NoteSlot {...rest}>
        {slot.notes.map((n, i) => (
          <Note key={id + i}>{n}</Note>
        ))}
      </NoteSlot>
    );
  return (
    <BaseSlot {...rest} invalid={isInvalid(slot)} prefilled={isPrefilled(slot)}>
      {slot.value}
    </BaseSlot>
  );
};
