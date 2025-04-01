import React from 'react';
import styled from 'styled-components';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  
  span {
    background-color: ${({ theme }) => theme.colors.text.primary};
    
    &::before,
    &::after {
      background-color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <span className={isOpen ? 'open' : ''} />
    </StyledButton>
  );
};

export default HamburgerButton; 