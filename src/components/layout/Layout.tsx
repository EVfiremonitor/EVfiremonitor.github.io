import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import { BaseProps } from '../../types/common';
import { BREAKPOINTS } from '../../styles/breakpoints';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 70px calc(100vh - 70px);
  grid-template-areas: 
    "header header"
    "sidebar main";
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header"
      "main";
  }
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  grid-area: sidebar;
  height: calc(100vh - 70px);
  position: relative;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100vh - 60px);
    width: 300px;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    z-index: 100;
    box-shadow: ${props => props.isOpen ? props.theme.shadows.md : 'none'};
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.background.overlay};
    z-index: 90;
  }
`;

const MainContainer = styled.main`
  grid-area: main;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

interface LayoutProps extends BaseProps {
  children: React.ReactNode;
  isOperating: boolean;
  onForceValveClose: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  isOperating, 
  onForceValveClose 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <LayoutContainer>
      <Header 
        isOperating={isOperating} 
        onForceValveClose={onForceValveClose}
        onMenuClick={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Sidebar />
      </SidebarWrapper>
      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <MainContainer>{children}</MainContainer>
    </LayoutContainer>
  );
};

export default Layout; 