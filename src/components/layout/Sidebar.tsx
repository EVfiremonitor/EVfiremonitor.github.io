import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { BaseProps } from '../../types/common';
import { 
  TemperatureSettingsData, 
  FireDetectionData 
} from '../../types/parking';
import { BREAKPOINTS } from '../../styles/breakpoints';
import { Theme } from '../../styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTestMode, setForceValveClose, updateTemperatureSettings } from '../../store/parkingSlice';
import { RootState } from '../../store/store';

const SidebarContainer = styled.aside`
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  height: calc(100vh - 70px);
  overflow-y: auto;
  position: sticky;
  top: 70px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    height: calc(100vh - 60px);
    top: 60px;
  }
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

const TemperatureItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const Label = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

interface ValueProps {
  color?: string;
}

const Value = styled.span<ValueProps>`
  font-weight: bold;
  color: ${({ theme, color }) => color || theme.colors.status.normal};
`;

interface SidebarProps extends BaseProps {
  temperatureSettings?: TemperatureSettingsData;
  fireDetection?: FireDetectionData;
}

const defaultTemperatureSettings: TemperatureSettingsData = {
  lightAlarm: 45,
  mediumAlarm: 55,
  fireSuppression: 65
};

const defaultFireDetection: FireDetectionData = {
  detectedCount: 72,
  averageTemperature: 32
};

const TestControls = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

const TestButton = styled.button<{ isActive?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.status.danger : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ForceValveButton = styled(TestButton)`
  margin-top: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.status.warning};
`;

const EditButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TemperatureValue = styled.div<{ isEditing?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease-in-out;
  
  ${({ isEditing, theme }) => isEditing && `
    background-color: ${theme.colors.background.primary};
    box-shadow: 0 0 0 1px ${theme.colors.primary};
  `}
`;

const TemperatureInput = styled.input`
  width: 60px;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  text-align: right;
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 0;
  }
`;

const Unit = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: 4px;
  font-weight: 500;
`;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { isTestMode, temperatureSettings } = useSelector((state: RootState) => state.parking);
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(temperatureSettings);
  const theme = useTheme() as Theme;
  
  const handleTestClick = () => {
    console.log('Test button clicked, current mode:', isTestMode);
    dispatch(setTestMode({ isActive: !isTestMode, targetId: 2 }));
    console.log('Test mode updated:', !isTestMode);
  };

  const handleForceValveClose = () => {
    dispatch(setForceValveClose(2));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(updateTemperatureSettings({
        type: 'lightAlarm',
        value: tempSettings.lightAlarm
      }));
      dispatch(updateTemperatureSettings({
        type: 'mediumAlarm',
        value: tempSettings.mediumAlarm
      }));
      dispatch(updateTemperatureSettings({
        type: 'fireSuppression',
        value: tempSettings.fireSuppression
      }));
    }
    setIsEditing(!isEditing);
  };

  const handleTemperatureChange = (
    type: 'lightAlarm' | 'mediumAlarm' | 'fireSuppression',
    value: string
  ) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setTempSettings(prev => ({
        ...prev,
        [type]: numValue
      }));
    }
  };

  return (
    <SidebarContainer>
      <Section>
        <SectionTitleContainer>
          <SectionTitle>Temperature Setting</SectionTitle>
          <EditButton onClick={handleEdit}>
            {isEditing ? '저장' : '수정'}
          </EditButton>
        </SectionTitleContainer>
        <TemperatureItem>
          <Label>Light Alarm</Label>
          <TemperatureValue isEditing={isEditing}>
            {isEditing ? (
              <TemperatureInput
                type="number"
                value={tempSettings.lightAlarm}
                onChange={(e) => handleTemperatureChange('lightAlarm', e.target.value)}
                min="0"
                max={tempSettings.mediumAlarm}
              />
            ) : (
              <Value>{temperatureSettings.lightAlarm}</Value>
            )}
            <Unit>°C</Unit>
          </TemperatureValue>
        </TemperatureItem>
        <TemperatureItem>
          <Label>Medium Alarm</Label>
          <TemperatureValue isEditing={isEditing}>
            {isEditing ? (
              <TemperatureInput
                type="number"
                value={tempSettings.mediumAlarm}
                onChange={(e) => handleTemperatureChange('mediumAlarm', e.target.value)}
                min={tempSettings.lightAlarm}
                max={tempSettings.fireSuppression}
              />
            ) : (
              <Value>{temperatureSettings.mediumAlarm}</Value>
            )}
            <Unit>°C</Unit>
          </TemperatureValue>
        </TemperatureItem>
        <TemperatureItem>
          <Label>Fire Suppression</Label>
          <TemperatureValue isEditing={isEditing}>
            {isEditing ? (
              <TemperatureInput
                type="number"
                value={tempSettings.fireSuppression}
                onChange={(e) => handleTemperatureChange('fireSuppression', e.target.value)}
                min={tempSettings.mediumAlarm}
              />
            ) : (
              <Value>{temperatureSettings.fireSuppression}</Value>
            )}
            <Unit>°C</Unit>
          </TemperatureValue>
        </TemperatureItem>
      </Section>

      <Section>
        <SectionTitle>Fire Detected</SectionTitle>
        <TemperatureItem>
          <Label>Fire Detected</Label>
          <Value>{defaultFireDetection.detectedCount}</Value>
        </TemperatureItem>
        <TemperatureItem>
          <Label>Average Temperature</Label>
          <Value>{defaultFireDetection.averageTemperature}°C</Value>
        </TemperatureItem>
      </Section>

      <TestControls>
        <TestButton 
          onClick={handleTestClick}
          isActive={isTestMode}
          aria-label={isTestMode ? '테스트 중지' : '테스트 시작'}
        >
          {isTestMode ? '테스트 중지' : '테스트 시작'}
        </TestButton>
        
      </TestControls>
    </SidebarContainer>
  );
};

export default Sidebar; 