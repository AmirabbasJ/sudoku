import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2.25rem;
  font-size: 1.3em;
  background-color: transparent;
  border: 0.12rem solid royalblue;
  border-radius: 0.5rem;
  color: royalblue;
  cursor: pointer;
  :hover {
    border: 0.12rem solid white;
    background-color: royalblue;
    color: white;
  }
`;

interface EraseBtnProps {
  onClick: () => void;
}

export const EraseBtn: React.FC<EraseBtnProps> = ({ onClick }) => {
  return <Button onClick={onClick}>erase</Button>;
};
