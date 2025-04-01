import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import TemperatureDisplay from './TemperatureDisplay';
import { BaseProps } from '../../types/common';
import { ParkingData } from '../../types/parking';

const ParkingCellContainer = styled(Card)`
  width: 100%;
`;

interface StatusProps {
  isOpen: boolean;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: white;
`;

const Status = styled.div<StatusProps>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.isOpen ? '#4CAF50' : '#FF4B2B'};
  border-radius: 4px;
  color: white;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FireAlert = styled.div`
  background-color: #FF4B2B;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
`;

interface ParkingCellProps extends ParkingData, BaseProps {}

const ParkingCell: React.FC<ParkingCellProps> = ({
  id,
  temperature,
  isOpen = true,
  isActive = true,
  isFireDetected = false
}) => {
  return (
    <ParkingCellContainer isActive={isActive} isDetected={isFireDetected}>
      <Header>
        <Title>Parking {id}</Title>
        <Status isOpen={isOpen}>{isOpen ? 'OPEN' : 'CLOSED'}</Status>
      </Header>
      <Content>
        <TemperatureDisplay temperature={temperature} />
      </Content>
      {isFireDetected && (
        <FireAlert>FIRE DETECTED</FireAlert>
      )}
    </ParkingCellContainer>
  );
};

export default ParkingCell; 