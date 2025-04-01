import React from 'react';
import styled from 'styled-components';
import { BaseProps, WithChildren } from '../../types/common';

interface CardStyleProps {
  isActive: boolean;
  isDetected: boolean;
}

const CardWrapper = styled.div<CardStyleProps>`
  background-color: ${props => props.isActive ? '#0A2647' : '#1B2430'};
  border: 1px solid ${props => props.isDetected ? '#FF4B2B' : '#2C3333'};
  border-radius: 8px;
  padding: 1rem;
  color: white;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  
  ${props => props.isDetected && `
    box-shadow: 0 0 15px rgba(255, 75, 43, 0.5);
  `}
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