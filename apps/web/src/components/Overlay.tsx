import styled from 'styled-components';

import type { GameState } from '../context/GameStateCtx';
import { Title } from './Title';

export const SOverlay = styled.div<{ show: boolean; hideAll?: boolean }>`
  position: absolute;
  width: ${({ show }) => (show ? '100%' : '0%')};
  height: ${({ show }) => (show ? '100%' : '0%')};
  background-color: ${({ hideAll, theme }) =>
    hideAll ? theme.bg : theme.overlayColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5em;
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

interface OverlayProps {
  state: GameState;
}

export const Overlay: React.FC<OverlayProps> = ({ state }) => {
  if (state === 'paused') return <SOverlay show={true} />;
  if (state === 'loading')
    return (
      <SOverlay show={true} hideAll={true}>
        <Spinner />
      </SOverlay>
    );
  if (state === 'won')
    return (
      <SOverlay show={true} hideAll={true}>
        <Title>You Won!</Title>
      </SOverlay>
    );
  return null;
};
