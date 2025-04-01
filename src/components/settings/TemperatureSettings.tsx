import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateTemperatureSettings } from '../../store/parkingSlice';

const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
`;

const Input = styled.input`
  width: 80px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TemperatureSettings: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.parking.temperatureSettings);

  const handleChange = (type: 'lightAlarm' | 'mediumAlarm' | 'fireSuppression', value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      dispatch(updateTemperatureSettings({ type, value: numValue }));
    }
  };

  return (
    <SettingsContainer>
      <h3>온도 설정</h3>
      <SettingRow>
        <Label htmlFor="lightAlarm">경고 온도</Label>
        <Input
          id="lightAlarm"
          type="number"
          value={settings.lightAlarm}
          onChange={(e) => handleChange('lightAlarm', e.target.value)}
          min="0"
        />
      </SettingRow>
      <SettingRow>
        <Label htmlFor="mediumAlarm">위험 온도</Label>
        <Input
          id="mediumAlarm"
          type="number"
          value={settings.mediumAlarm}
          onChange={(e) => handleChange('mediumAlarm', e.target.value)}
          min="0"
        />
      </SettingRow>
      <SettingRow>
        <Label htmlFor="fireSuppression">화재 감지 온도</Label>
        <Input
          id="fireSuppression"
          type="number"
          value={settings.fireSuppression}
          onChange={(e) => handleChange('fireSuppression', e.target.value)}
          min="0"
        />
      </SettingRow>
    </SettingsContainer>
  );
};

export default TemperatureSettings; 