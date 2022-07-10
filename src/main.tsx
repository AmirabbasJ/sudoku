import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import { Board } from './components/Board';
import { GlobalStyle } from './GlobalStyles';

const Container = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Container>
      <Board />
    </Container>
  </React.StrictMode>,
);
