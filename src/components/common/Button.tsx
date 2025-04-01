import React from 'react';
import styled from 'styled-components';
import { ButtonVariant, BaseProps, WithChildren } from '../../types/common';

interface StyledButtonProps {
  variant: ButtonVariant;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  ${props => {
    switch (props.variant) {
      case 'warning':
        return `
          background-color: ${props.theme.colors.status.warning};
          color: ${props.theme.colors.text.primary};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.button.hover};
          }
        `;
      case 'danger':
        return `
          background-color: ${props.theme.colors.status.danger};
          color: ${props.theme.colors.text.primary};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.button.hover};
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.status.normal};
          color: ${props.theme.colors.text.primary};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.button.hover};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.button.disabled};
  }
`;

interface ButtonProps extends BaseProps, WithChildren {
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  ...props 
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button; 