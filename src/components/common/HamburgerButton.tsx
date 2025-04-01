import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../styles/breakpoints';

const Button = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  margin-right: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    position: relative;
    z-index: 10;
  }
`;

const Line = styled.span<{ isOpen: boolean }>`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  
  &:nth-child(1) {
    top: 0;
    transform: ${({ isOpen }) => 
      isOpen ? 'translateY(9px) rotate(45deg)' : 'none'};
  }
  
  &:nth-child(2) {
    top: 8px;
    opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    transform: translateX(${({ isOpen }) => isOpen ? '-100%' : '0'});
  }
  
  &:nth-child(3) {
    bottom: 0;
    transform: ${({ isOpen }) => 
      isOpen ? 'translateY(-9px) rotate(-45deg)' : 'none'};
  }
`;

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => (
  <Button onClick={onClick} aria-label="Toggle menu">
    <Line isOpen={isOpen} />
    <Line isOpen={isOpen} />
    <Line isOpen={isOpen} />
  </Button>
);

export default HamburgerButton; 