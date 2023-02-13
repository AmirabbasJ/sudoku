import { ThemeProvider } from '@sudoku/design';
import styled from 'styled-components';

import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const Container = styled.main`
  background-color: ${({ theme }) => theme.bg};
  padding: 2rem 4rem;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  align-content: center;
  justify-items: center;
  grid-gap: 4rem;
  position: relative;
`;

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Container>
        <ThemeSwitcher />
        <Board />
        <Controls />
      </Container>
    </ThemeProvider>
  );
};
