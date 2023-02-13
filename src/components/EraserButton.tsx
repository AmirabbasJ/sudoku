import { useSudoku } from '@sudoku/hooks';
import { EraserIcon } from '@sudoku/icons';
import styled from 'styled-components';

import { Button } from './Button';
import { Title } from './Title';

const Container = styled.div`
  position: relative;
`;

export const EraserButton: React.FC = () => {
  const { deleteSelectedSlot } = useSudoku();
  return (
    <Container>
      <Button onClick={deleteSelectedSlot}>
        <EraserIcon />
      </Button>
      <Title>Erase</Title>
    </Container>
  );
};
