import styled from 'styled-components';

import { DraftButton } from './DraftButton';
import { EraserButton } from './EraserButton';
import { Timer } from './Timer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

export const Controls: React.FC = () => {
  return (
    <Container>
      <EraserButton />
      <Timer />
      <DraftButton />
    </Container>
  );
};
