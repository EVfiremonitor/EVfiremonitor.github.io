import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../styles/breakpoints';

const Button = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
  }
`;

const Line = styled.span<{ isOpen: boolean }>`
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
  
  &:nth-child(1) {
    transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }
  
  &:nth-child(2) {
    opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
  }
  
  &:nth-child(3) {
    transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
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