import styled from 'styled-components';

import { useBoard } from '../hooks/useBoard';
import { Button } from './Button';
import { EraserIcon } from './Icons/EraserIcon';
import { Title } from './Title';

const Container = styled.div`
  position: relative;
`;

export const EraserButton: React.FC = () => {
  const { deleteSelectedSlot } = useBoard();
  return (
    <Container>
      <Button onClick={deleteSelectedSlot}>
        <EraserIcon />
      </Button>
      <Title>Erase</Title>
    </Container>
  );
};
