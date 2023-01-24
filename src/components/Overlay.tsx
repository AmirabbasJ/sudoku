import styled from 'styled-components';

import type { GameState } from '../context/GameStateCtx';
import { PauseIcon } from './Icons/PauseIcon';
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

const Spinner = styled.div`
  ::after {
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
  }

  border-radius: 50%;
  width: 12rem;
  height: 12rem;
  border: 1.1rem solid ${({ theme }) => theme.secondary};
  border-left: 1.1rem solid ${({ theme }) => theme.primary};
  animation: spin 1.1s infinite linear;

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Won = styled(Title)`
  font-size: 5em;
`;

const Error = styled(Title)`
  font-size: 2.5em;
  color: ${({ theme }) => theme.mistake};
`;

interface OverlayProps {
  state: GameState;
}

export const Overlay: React.FC<OverlayProps> = ({ state }) => {
  if (state === 'paused')
    return (
      <StyledOverlay>
        <PauseIcon size={5} />
      </StyledOverlay>
    );
  if (state === 'loading')
    return (
      <StyledOverlay>
        <Spinner />
      </StyledOverlay>
    );
  if (state === 'won')
    return (
      <StyledOverlay>
        <Won>You Won!</Won>
      </StyledOverlay>
    );
  if (state === 'error')
    return (
      <StyledOverlay>
        <Error>error occurred while loading sudoku!!</Error>
        <Error>please try again later</Error>
      </StyledOverlay>
    );
  return null;
};
