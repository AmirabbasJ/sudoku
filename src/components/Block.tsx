import styled from 'styled-components';

export const Block = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 0.0625rem;
  border-left: none;
  background-color: ${({ theme }) => theme.secondaryActive};
  border-bottom: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
