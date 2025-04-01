import React from 'react';
import styled from 'styled-components';
import { BaseProps, SystemStatus } from '../../types/common';
import { BREAKPOINTS } from '../../styles/breakpoints';

interface StatusItemStyleProps {
  status: SystemStatus;
}

const StatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 300px;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const StatusItem = styled.div<StatusItemStyleProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme, status }) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return theme.colors.status.normal;
      case 'warning':
        return theme.colors.status.warning;
      case 'danger':
        return theme.colors.status.danger;
      default:
        return theme.colors.status.inactive;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const StatusLabel = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.white};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1rem;
  }
`;

const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const StatusValue = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 0.875rem;
  }
`;

interface StatusIndicatorsProps extends BaseProps {
  temperatureSensor1Status: SystemStatus;
  waterValveStatus: SystemStatus;
  serverStatus: SystemStatus;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({ 
  temperatureSensor1Status = 'Normal',
  waterValveStatus = 'Normal',
  serverStatus = 'Normal'
}) => {
  return (
    <StatusContainer>
      <StatusItem status={temperatureSensor1Status}>
        <StatusLabel>Temperature Sensor</StatusLabel>
        <StatusInfo>
          <StatusValue></StatusValue>
          <StatusValue>{temperatureSensor1Status}</StatusValue>
        </StatusInfo>
      </StatusItem>

      <StatusItem status={waterValveStatus}>
        <StatusLabel>Water Valve</StatusLabel>
        <StatusValue>{waterValveStatus}</StatusValue>
      </StatusItem>

      <StatusItem status={serverStatus}>
        <StatusLabel>Server</StatusLabel>
        <StatusValue>{serverStatus}</StatusValue>
      </StatusItem>
    </StatusContainer>
  );
};

export default StatusIndicators; 