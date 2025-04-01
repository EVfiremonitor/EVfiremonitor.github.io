import React from 'react';
import styled from 'styled-components';
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
  background-color: #0A2647;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    height: 60px;
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  img {
    height: 36px;
    
    @media (max-width: ${BREAKPOINTS.mobile}) {
      height: 28px;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.2rem;
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

const StatusIndicator = styled.div<StatusIndicatorProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    span {
      display: none;
    }
    
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${props => props.isOperating ? '#4CAF50' : '#FF4B2B'};
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