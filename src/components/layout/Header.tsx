import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../common/Button';
import logo from '../../assets/logo.png';
import { BaseProps } from '../../types/common';
import HamburgerButton from '../common/HamburgerButton';
import { BREAKPOINTS } from '../../styles/breakpoints';

const HeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    height: 60px;
    padding: 0 1rem;
  }

  h1 {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  img {
    height: 36px;
    
    @media (max-width: ${BREAKPOINTS.mobile}) {
      height: 24px;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.1rem;
  }
`;

const OperationStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: 0.5rem;
  }
`;

interface StatusIndicatorProps {
  isOperating: boolean;
}

// 점멸 애니메이션 추가
const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const StatusIndicator = styled.div<StatusIndicatorProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: ${({ theme, isOperating }) => 
      isOperating ? theme.colors.status.normal : theme.colors.status.danger};
    animation: ${blinkAnimation} 2s ease-in-out infinite;
  }

  span {
    color: ${({ theme, isOperating }) => 
      isOperating ? theme.colors.status.normal : theme.colors.status.danger};
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    span {
      display: none;
    }
    
    &::before {
      width: 10px;
      height: 10px;
    }
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

interface HeaderProps extends BaseProps {
  isOperating: boolean;
  onForceValveClose: () => void;
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isOperating, 
  onForceValveClose, 
  onMenuClick,
  isSidebarOpen 
}) => (
  <HeaderContainer>
    <Logo>
      <HamburgerButton isOpen={isSidebarOpen} onClick={onMenuClick} />
      <img src={logo} alt="TheKeeper" />
      <Title>EV Fire Monitor</Title>
    </Logo>
    <OperationStatus>
      <StatusIndicator isOperating={isOperating}>
        <span>{isOperating ? 'In Operation' : 'System Error'}</span>
      </StatusIndicator>
      <StyledButton 
        variant="warning" 
        onClick={onForceValveClose}
      >
        {window.innerWidth <= 768 ? 'Close Valve' : 'Force Valve Close'}
      </StyledButton>
    </OperationStatus>
  </HeaderContainer>
);

export default Header; 