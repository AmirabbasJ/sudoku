import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { BoardCtxProvider } from './context/BoardCtx';
import { DraftCtxProvider } from './context/DraftContext';
import { GlobalStyle } from './GlobalStyles';

const Container = styled.main`
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
        <GlobalStyle />
        <Container>
          <Board />
          <Controls />
        </Container>
      </BoardCtxProvider>
    </DraftCtxProvider>
  </React.StrictMode>,
);
