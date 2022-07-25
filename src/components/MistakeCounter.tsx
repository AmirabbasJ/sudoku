import React from 'react';
import styled from 'styled-components';

import { useBoard } from '../hooks/useBoard';

const Container = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5em;
`;

const Count = styled.span<{ count: number }>`
  font-weight: bold;
  transition: color 300ms ease-in-out;
  color: ${({ count, theme }) => (count < 3 ? theme.primary : count < 8 ? theme.midMistakeCount : theme.mistake)};
`;
const Mistakes = styled.p``;

export const MistakeCounter: React.FC = () => {
  const { mistakesCount } = useBoard();

  return (
    <Container>
      <Mistakes>
        mistakes: <Count count={mistakesCount}>{mistakesCount}</Count>
      </Mistakes>
    </Container>
  );
};
