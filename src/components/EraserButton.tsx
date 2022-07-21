import styled from 'styled-components';

import { Button } from './Button';
import { Eraser } from './Eraser';

const Title = styled.p`
  text-align: center;
  padding: 0.5rem 0;
  color: royalblue;
  font-size: 1.1em;
  cursor: default;
`;

const Container = styled.div`
  position: relative;
`;

interface EraserButtonProps {
  onClick: () => void;
  title: string;
}

export const EraserButton: React.FC<EraserButtonProps> = ({ onClick, title }) => {
  return (
    <Container>
      <Button onClick={onClick}>
        <Eraser />
      </Button>
      <Title>{title}</Title>
    </Container>
  );
};
