import React from 'react';
import ReactDOM from 'react-dom/client';
import styled, { ThemeProvider } from 'styled-components';

import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { BoardCtxProvider } from './context/BoardCtx';
import { DraftCtxProvider } from './context/DraftCtx';
import { GlobalStyle } from './GlobalStyles';
import { darkTheme } from './theme';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DraftCtxProvider>
      <BoardCtxProvider>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <Container>
            <Board />
            <Controls />
          </Container>
        </ThemeProvider>
      </BoardCtxProvider>
    </DraftCtxProvider>
  </React.StrictMode>,
);
