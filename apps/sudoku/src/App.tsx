import styled, { ThemeProvider } from 'styled-components';

import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { GlobalStyle } from './GlobalStyles';
import { useTheme } from './hooks/useTheme';
import { darkTheme, lightTheme } from './theme';

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
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <ThemeSwitcher />
        <Board />
        <Controls />
      </Container>
    </ThemeProvider>
  );
};
