import { PauseIcon } from '@sudoku/icons';
import styled from 'styled-components';

import { useGameState } from '../hooks';
import { Title } from './Title';

export const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.overlayColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Won = styled(Title)`
  font-size: 5em;
`;

export const Overlay = () => {
  const { isPaused, isWon } = useGameState();

  if (isPaused)
    return (
      <StyledOverlay>
        <PauseIcon size={5} />
      </StyledOverlay>
    );

  if (isWon)
    return (
      <StyledOverlay>
        <Won>You Won!</Won>
      </StyledOverlay>
    );

  return null;
};
