import React from 'react';
import styled from 'styled-components';

const Btn = styled.button<{ withBorder: boolean }>`
  outline: none;
  padding: 0.8rem;
  font-size: 1.3em;
  background-color: transparent;
  background-color: #ebeff4;
  border-radius: 100rem;
  color: royalblue;
  cursor: pointer;
  border: 0.2rem solid ${({ withBorder }) => (withBorder ? 'royalblue' : 'transparent')};
  transition: border 100ms ease-in-out;
  :hover {
    background-color: #dce3ed;
    color: white;
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  withBorder?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, withBorder = false }) => {
  return (
    <Btn onClick={onClick} withBorder={withBorder}>
      {children}
    </Btn>
  );
};
