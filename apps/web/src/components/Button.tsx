import React from 'react';
import styled from 'styled-components';

const Btn = styled.button<{ withBorder: boolean }>`
  outline: none;
  padding: 1.8rem;
  font-size: 1.3em;
  background-color: transparent;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 100rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  border: 0.2rem solid
    ${({ withBorder, theme }) => (withBorder ? theme.primary : 'transparent')};
  transition: border 100ms ease-in-out;
  :hover {
    background-color: ${({ theme }) => theme.btnHover};
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  withBorder?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  withBorder = false,
}) => {
  return (
    <Btn onClick={onClick} withBorder={withBorder}>
      {children}
    </Btn>
  );
};
