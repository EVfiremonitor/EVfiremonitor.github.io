import React from 'react';
import styled from 'styled-components';

interface ParkingGridProps {
  children: React.ReactNode;
}

const GridContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const GridCell = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.cell};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.dark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ParkingGrid: React.FC<ParkingGridProps> = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

export default ParkingGrid; 