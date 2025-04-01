import React from 'react';
import styled from 'styled-components';
import { BaseProps, WithChildren } from '../../types/common';

interface CardStyleProps {
  isActive: boolean;
  isDetected: boolean;
}

const CardWrapper = styled.div<CardStyleProps>`
  background-color: ${props => props.isActive ? props.theme.colors.background.secondary : props.theme.colors.background.dark};
  border: 1px solid ${props => props.isDetected ? props.theme.colors.status.danger : props.theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 200px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
`;

interface CardProps extends BaseProps, WithChildren, CardStyleProps {}

const Card: React.FC<CardProps> = ({ 
  children, 
  isActive = true, 
  isDetected = false, 
  ...props 
}) => {
  return (
    <CardWrapper 
      isActive={isActive} 
      isDetected={isDetected} 
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

export default Card; 