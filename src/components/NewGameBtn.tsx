import { useSudoku } from '@sudoku/hooks';
import { useClickAway, useToggle } from 'ahooks';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { Btn } from './Button';

const Container = styled.div`
  position: relative;
`;

const NewGameButton = styled(Btn)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textSecondary};
  border-radius: 1rem;
  :hover {
    background-color: ${({ theme }) => theme.primaryEmphasized};
  }
`;

const DropDown = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 100%;
  position: absolute;
  z-index: 2;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const GameMode = styled(Btn)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textSecondary};
  width: 100%;
  padding: 1rem;
  border-radius: 0;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.primaryEmphasized};
  }
`;

export const NewGameBtn: React.FC = () => {
  const { newGame } = useSudoku();
  const [isDropdownOpen, { toggle, setLeft }] = useToggle(false);
  const ref = useRef(null);

  useClickAway(setLeft, ref);

  return (
    <Container>
      <NewGameButton ref={ref} onClick={toggle}>
        New Game
      </NewGameButton>
      <DropDown show={isDropdownOpen}>
        <GameMode onClick={() => newGame('easy')}>Easy</GameMode>
        <GameMode onClick={() => newGame('medium')}>Medium</GameMode>
        <GameMode onClick={() => newGame('hard')}>Hard</GameMode>
      </DropDown>
    </Container>
  );
};
