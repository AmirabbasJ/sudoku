import styled from 'styled-components';

import { DraftButton } from './DraftButton';
import { EraserButton } from './EraserButton';
import { Keypad } from './Keypad';
import { MistakeCounter } from './MistakeCounter';
import { Timer } from './Timer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  align-items: center;
`;

const Bottom = styled.div``;

const MiddleTop = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const Controls: React.FC = () => {
  return (
    <Container>
      <Top>
        <EraserButton />
        <MiddleTop>
          <MistakeCounter />
          <Timer />
        </MiddleTop>
        <DraftButton />
      </Top>
      <Bottom>
        <Keypad />
      </Bottom>
    </Container>
  );
};
