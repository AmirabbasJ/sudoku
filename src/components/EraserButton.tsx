import styled from 'styled-components';

import { Button } from './Button';
import { Eraser } from './Eraser';
import { Title } from './Title';

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
