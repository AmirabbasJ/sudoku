import styled, { ThemeProvider } from 'styled-components';

import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { GlobalStyle } from './GlobalStyles';
import { useTheme } from './hooks/useTheme';

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
`;

export const App: React.FC = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Board />
        <Controls />
      </Container>
    </ThemeProvider>
  );
};
