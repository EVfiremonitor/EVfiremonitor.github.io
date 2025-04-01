import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../types/common';

interface TemperatureStyleProps {
  temperature: number | null;
}

const TemperatureContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TemperatureIcon = styled.div<TemperatureStyleProps>`
  width: 24px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.border};
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    
    ${props => {
      const color = !props.temperature
        ? props.theme.colors.text.disabled
        : props.temperature >= 65
        ? props.theme.colors.status.danger
        : props.temperature >= 55
        ? props.theme.colors.status.warning
        : props.theme.colors.status.normal;

      const bottomPosition = !props.temperature
        ? '5px'  // null일 때는 아래에 위치
        : '20px'; // 온도에 따라 위치 계산

      return `
        background-color: ${color};
        bottom: ${bottomPosition};
      `;
    }}
  }
`;

const TemperatureValue = styled.span<TemperatureStyleProps>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => {
    if (!props.temperature) return props.theme.colors.text.secondary;
    if (props.temperature >= 65) return props.theme.colors.status.danger;
    if (props.temperature >= 55) return props.theme.colors.status.warning;
    return props.theme.colors.status.normal;
  }};
`;

const Unit = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.xs};
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