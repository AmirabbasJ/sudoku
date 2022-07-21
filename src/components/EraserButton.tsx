import styled from 'styled-components';

import { Button } from './Button';
import { EraserIcon } from './Icons/EraserIcon';
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
        <EraserIcon />
      </Button>
      <Title>{title}</Title>
    </Container>
  );
};
