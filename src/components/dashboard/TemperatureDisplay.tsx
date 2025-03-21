import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../types/common';

interface TemperatureStyleProps {
  temperature: number | null;
}

const TemperatureContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TemperatureIcon = styled.div<TemperatureStyleProps>`
  width: 24px;
  height: 40px;
  background-color: #fff;
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background-color: ${props => {
      if (!props.temperature) return '#888';
      if (props.temperature >= 65) return '#FF4B2B';
      if (props.temperature >= 55) return '#FFD93D';
      return '#4CAF50';
    }};
    border-radius: 50%;
  }
`;

const TemperatureValue = styled.span<TemperatureStyleProps>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => {
    if (!props.temperature) return '#888';
    if (props.temperature >= 65) return '#FF4B2B';
    if (props.temperature >= 55) return '#FFD93D';
    return '#4CAF50';
  }};
`;

const Unit = styled.span`
  font-size: 1.2rem;
  color: #888;
  margin-left: 4px;
`;

interface TemperatureDisplayProps extends BaseProps {
  temperature: number | null;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ temperature }) => {
  return (
    <TemperatureContainer>
      <TemperatureIcon temperature={temperature} />
      <div>
        <TemperatureValue temperature={temperature}>
          {temperature ?? '--'}
          <Unit>°C</Unit>
        </TemperatureValue>
      </div>
    </TemperatureContainer>
  );
};

export default TemperatureDisplay; 