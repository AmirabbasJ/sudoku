import styled from 'styled-components';

import { Board } from './Board';
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

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Board />
      </Container>
    </>
  );
};
