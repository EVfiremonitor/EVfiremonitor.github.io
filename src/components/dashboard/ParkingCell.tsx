import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import Card from '../common/Card';
import TemperatureDisplay from './TemperatureDisplay';
import { BaseProps } from '../../types/common';

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
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Status = styled.button<StatusProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme, isOpen }) => 
    isOpen ? theme.colors.status.normal : theme.colors.status.danger};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FireAlert = styled.div<{ blink: boolean }>`
  background-color: ${({ theme, blink }) => 
    blink ? theme.colors.status.danger : theme.colors.status.warning};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
  animation: ${({ blink }) => blink ? 'blinkAnimation 1s infinite' : 'none'};

  @keyframes blinkAnimation {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

interface ParkingCellProps extends BaseProps {
  id: number;
  isActive?: boolean;
  onToggle?: (id: number) => void;
}

const ParkingCell: React.FC<ParkingCellProps> = ({
  id,
  isActive = true,
  onToggle
}) => {
  // Redux에서 주차면 정보 가져오기
  const parkingSpace = useSelector((state: RootState) => 
    state.parking.spaces.find(space => space.id === id)
  );

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id);
    }
  };

  if (!parkingSpace) return null;

  return (
    <ParkingCellContainer isActive={isActive} isDetected={parkingSpace.isFireDetected}>
      <Header>
        <Title>Parking {id}</Title>
        <Status 
          isOpen={parkingSpace.isOpen} 
          onClick={handleToggle}
          aria-label={parkingSpace.isOpen ? 'Close parking space' : 'Open parking space'}
        >
          {parkingSpace.isOpen ? 'OPEN' : 'CLOSED'}
        </Status>
      </Header>
      <Content>
        <TemperatureDisplay temperature={parkingSpace.temperature} />
      </Content>
      {parkingSpace.isFireDetected && (
        <FireAlert blink={parkingSpace.isFireDetected}>FIRE DETECTED</FireAlert>
      )}
    </ParkingCellContainer>
  );
};

export default ParkingCell; 