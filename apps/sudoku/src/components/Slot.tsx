import styled from 'styled-components';

export interface SlotProps {
  isSelected: boolean;
  isMistake: boolean;
  isMutable: boolean;
  isCoveredSlot: boolean;
  hasSameContent: boolean;
}
export const Slot = styled.div<SlotProps>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ isSelected, isMistake, isCoveredSlot, hasSameContent, theme }) =>
    isSelected
      ? theme.selectedSlot
      : isMistake
      ? theme.mistakeBg
      : hasSameContent
      ? theme.sameContentSlots
      : isCoveredSlot
      ? theme.coveredSlots
      : theme.slotBg};
  color: ${({ isMistake, isMutable, theme }) =>
    isMistake ? theme.mistake : isMutable ? theme.primary : theme.slotFontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
  cursor: pointer;
  outline: none;
`;
