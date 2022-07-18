import styled from 'styled-components';

interface SlotProps {
  isSelected: boolean;
  isMistake: boolean;
  isMutable: boolean;
  isCoveredSlot: boolean;
  hasSameContent: boolean;
}
export const Slot = styled.div<SlotProps>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ isSelected, isMistake, isCoveredSlot, hasSameContent }) =>
    isSelected ? '#b6d8ff' : isMistake ? '#ffdbdb' : hasSameContent ? '#bdd4ee' : isCoveredSlot ? '#e5edf7' : 'white'};
  color: ${({ isMistake, isMutable }) => (isMistake ? 'tomato' : isMutable ? 'royalblue' : 'initial')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
  cursor: pointer;
  user-select: none;
  outline: none;
`;
