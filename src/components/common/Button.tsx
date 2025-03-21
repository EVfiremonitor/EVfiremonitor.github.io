import React from 'react';
import styled from 'styled-components';
import { ButtonVariant, BaseProps, WithChildren } from '../../types/common';

interface StyledButtonProps {
  variant: ButtonVariant;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => {
    switch (props.variant) {
      case 'warning':
        return `
          background-color: #FFD93D;
          color: #000000;
          border: none;
          &:hover {
            background-color: #FFC436;
          }
        `;
      case 'danger':
        return `
          background-color: #FF4B2B;
          color: white;
          border: none;
          &:hover {
            background-color: #FF6B3D;
          }
        `;
      default:
        return `
          background-color: #4CAF50;
          color: white;
          border: none;
          &:hover {
            background-color: #45a049;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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