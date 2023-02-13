import { useTheme } from '@sudoku/hooks';
import { MoonIcon, SunIcon } from '@sudoku/icons';
import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  position: absolute;
  right: 0;
  margin: 0.5rem;
  border-radius: 100rem;
  background-color: ${({ theme }) => theme.secondary};
  outline: none;
  border: none;
  /* box-shadow: 1rem 1rem 0.5rem 0.5rem ${({ theme }) => theme.primary}; */
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.btnHover};
  }
`;

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Btn onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Btn>
  );
};
