import React from 'react';
import styled from 'styled-components';
import { BaseProps, SystemStatus } from '../../types/common';

interface StatusItemStyleProps {
  status: SystemStatus;
}

const StatusContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #0A2647;
  border-radius: 8px;
`;

const StatusItem = styled.div<StatusItemStyleProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.status === 'Normal' ? '#4CAF50' : '#FF4B2B'};
  border-radius: 4px;
  color: white;
  font-weight: 500;
`;

const StatusLabel = styled.span`
  font-size: 1.2rem;
`;

const StatusValue = styled.span`
  font-weight: bold;
`;

interface StatusIndicatorsProps extends BaseProps {
  temperatureSensor1Status: SystemStatus;
  temperatureSensor2Status: SystemStatus;
  waterValveStatus: SystemStatus;
  serverStatus: SystemStatus;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({ 
  temperatureSensor1Status = 'Normal',
  temperatureSensor2Status = 'Normal',
  waterValveStatus = 'Normal',
  serverStatus = 'Normal'
}) => {
  return (
    <StatusContainer>
      <StatusItem status={temperatureSensor1Status}>
        <StatusLabel>Temperature Sensor</StatusLabel>
        <StatusValue>1</StatusValue>
        <StatusValue>{temperatureSensor1Status}</StatusValue>
      </StatusItem>
      
      <StatusItem status={temperatureSensor2Status}>
        <StatusLabel>Temperature Sensor</StatusLabel>
        <StatusValue>2</StatusValue>
        <StatusValue>{temperatureSensor2Status}</StatusValue>
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