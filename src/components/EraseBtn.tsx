import React from 'react';
import styled from 'styled-components';

const Button = styled.button``;

interface EraseBtnProps {
  onClick: () => void;
}

export const EraseBtn: React.FC<EraseBtnProps> = ({ onClick }) => {
  return <Button onClick={onClick}>erase</Button>;
};
