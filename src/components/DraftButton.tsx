import styled from 'styled-components';

import { useDraft } from '../hooks/useDraft';
import { Button } from './Button';
import { PencilIcon } from './Icons/PencilIcon';
import { Title } from './Title';

const State = styled.p<{ isOn: boolean }>`
  position: absolute;
  width: 3rem;
  color: white;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  border-radius: 100rem;
  background-color: ${({ isOn }) => (isOn ? 'royalblue' : '#adb7c3')};
  right: 0;
  top: 0;
  font-weight: bold;
  cursor: default;
  transform: translate(0.9rem, -0.5rem);
`;
const Container = styled.div`
  position: relative;
`;

export const DraftButton: React.FC = () => {
  const { isDraftMode, toggleDraftMode } = useDraft();
  return (
    <Container>
      <Button onClick={toggleDraftMode} withBorder={isDraftMode}>
        <PencilIcon />
      </Button>
      <Title>Draft</Title>
      <State isOn={isDraftMode}>{isDraftMode ? 'ON' : 'OFF'}</State>
    </Container>
  );
};
