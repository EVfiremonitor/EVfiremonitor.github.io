import styled from 'styled-components';

interface ParkingCellProps {
  status: 'Normal' | 'Warning' | 'Danger';
}

const ParkingCellContainer = styled.div<ParkingCellProps>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  .status {
    color: ${({ theme, status }) => 
      status === 'Normal' 
        ? theme.colors.status.normal 
        : theme.colors.status.danger
    };
  }
`; 