import styled from 'styled-components';

const Pause = styled.svg`
  fill: ${({ theme }) => theme.primary};
  width: 1rem;
  width: 1rem;
`;

export const PauseIcon: React.FC = () => {
  return (
    <Pause
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 277.338 277.338"
      xmlSpace="preserve"
    >
      <path
        d="M14.22,45.665v186.013c0,25.223,16.711,45.66,37.327,45.66c20.618,0,37.339-20.438,37.339-45.66V45.665
     c0-25.211-16.721-45.657-37.339-45.657C30.931,0,14.22,20.454,14.22,45.665z"
      />
      <path
        d="M225.78,0c-20.614,0-37.325,20.446-37.325,45.657V231.67c0,25.223,16.711,45.652,37.325,45.652s37.338-20.43,37.338-45.652
     V45.665C263.109,20.454,246.394,0,225.78,0z"
      />
    </Pause>
  );
};
