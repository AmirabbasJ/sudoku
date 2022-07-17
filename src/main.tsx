import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import { Board } from './components/Board';
import { BoardCtxProvider } from './context/BoardCtx';
import { GlobalStyle } from './GlobalStyles';

const Container = styled.main`
  padding: 2rem 4rem;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BoardCtxProvider>
      <GlobalStyle />
      <Container>
        <Board />
      </Container>
    </BoardCtxProvider>
  </React.StrictMode>,
);
