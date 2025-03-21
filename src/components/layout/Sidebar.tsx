import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../types/common';
import { TemperatureSettings, FireDetectionData } from '../../types/parking';

const SidebarContainer = styled.aside`
  grid-area: sidebar;
  background-color: #0A2647;
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #4CAF50;
  font-weight: 600;
`;

const TemperatureItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #1B2430;
  border-radius: 4px;
`;

const Label = styled.span`
  font-weight: 500;
`;

interface ValueProps {
  color?: string;
}

const Value = styled.span<ValueProps>`
  font-weight: bold;
  color: ${props => props.color || '#4CAF50'};
`;

interface SidebarProps extends BaseProps {
  temperatureSettings?: TemperatureSettings;
  fireDetection?: FireDetectionData;
}

const defaultTemperatureSettings: TemperatureSettings = {
  lightAlarm: 45,
  mediumAlarm: 55,
  fireSuppression: 65
};

const defaultFireDetection: FireDetectionData = {
  detectedCount: 72,
  averageTemperature: 32
};

const Sidebar: React.FC<SidebarProps> = ({
  temperatureSettings = defaultTemperatureSettings,
  fireDetection = defaultFireDetection
}) => {
  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>Temperature Setting</SectionTitle>
        <TemperatureItem>
          <Label>Light Alarm</Label>
          <Value color="#4CAF50">{temperatureSettings.lightAlarm}°C</Value>
        </TemperatureItem>
        <TemperatureItem>
          <Label>Medium Alarm</Label>
          <Value color="#FFD93D">{temperatureSettings.mediumAlarm}°C</Value>
        </TemperatureItem>
        <TemperatureItem>
          <Label>Fire Suppression</Label>
          <Value color="#FF4B2B">{temperatureSettings.fireSuppression}°C</Value>
        </TemperatureItem>
      </Section>

      <Section>
        <SectionTitle>Fire Detected</SectionTitle>
        <TemperatureItem>
          <Label>Fire Detected</Label>
          <Value>{fireDetection.detectedCount}</Value>
        </TemperatureItem>
        <TemperatureItem>
          <Label>Average Temperature</Label>
          <Value>{fireDetection.averageTemperature}°C</Value>
        </TemperatureItem>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar; 