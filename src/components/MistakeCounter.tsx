import { useMistakeCount, useSudoku } from '@sudoku/hooks';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5em;
`;

const Count = styled.span<{ count: number }>`
  font-weight: bold;
  transition: color 300ms ease-in-out;
  color: ${({ count, theme }) =>
    count < 3 ? theme.primary : count < 8 ? theme.warning : theme.error};
`;
const Mistakes = styled.p``;

export const MistakeCounter: React.FC = () => {
  const { mistakesCount } = useMistakeCount();

  return (
    <Container>
      <Mistakes>
        mistakes: <Count count={mistakesCount}>{mistakesCount}</Count>
      </Mistakes>
    </Container>
  );
};
