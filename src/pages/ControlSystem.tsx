import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import StatusIndicators from '../components/dashboard/StatusIndicators';
import ParkingCell from '../components/dashboard/ParkingCell';
import { 
  SystemStatusData, 
  ParkingData, 
  FireDetectionData, 
  TemperatureSettingsData 
} from '../types/parking';
import { BaseProps } from '../types/common';
import Layout from '../components/layout/Layout';
import { BREAKPOINTS } from '../styles/breakpoints';
import ParkingGrid from '../components/ParkingGrid';
import TemperatureSettingsComponent from '../components/settings/TemperatureSettings';

const StatusSection = styled.section`
  background-color: rgba(10, 38, 71, 0.5);
  border-radius: 12px;
  padding: 8px;
  margin: 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(8px);
`;

interface ControlSystemProps extends BaseProps {}

const ControlSystem: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatusData>({
    isOperating: true,
    temperatureSensor1: 'Normal',
    temperatureSensor2: 'Normal',
    waterValve: 'Normal',
    server: 'Normal'
  });

  const [parkingSpaces, setParkingSpaces] = useState<ParkingData[]>([
    {
      id: 1,
      temperature: 45,
      isOpen: false,
      isActive: true,
      isFireDetected: false
    },
    {
      id: 2,
      temperature: 55,
      isOpen: false,
      isActive: true,
      isFireDetected: false
    },
    {
      id: 3,
      temperature: 60,
      isOpen: true,
      isActive: true,
      isFireDetected: false
    },
    {
      id: 4,
      temperature: null,
      isOpen: false,
      isActive: false,
      isFireDetected: false
    },
    {
      id: 5,
      temperature: null,
      isOpen: false,
      isActive: false,
      isFireDetected: false
    }

    // ... 필요한 만큼 추가
  ]);

  const [temperatureSettings] = useState<TemperatureSettingsData>({
    lightAlarm: 45,
    mediumAlarm: 55,
    fireSuppression: 60
  });

  const [fireDetection] = useState<FireDetectionData>({
    detectedCount: 0,
    averageTemperature: 32
  });

  const handleForceValveClose = (): void => {
    // 모든 주차 공간의 밸브를 CLOSE 상태로 변경
    setParkingSpaces(prevSpaces =>
      prevSpaces.map(space => ({
        ...space,
        isOpen: false // 모든 공간을 CLOSED로 설정
      }))
    );
  };

  const handleToggle = (id: number) => {
    setParkingSpaces(prevSpaces =>
      prevSpaces.map(space =>
        space.id === id
          ? { ...space, isOpen: !space.isOpen }
          : space
      )
    );
  };

  return (
    <Layout 
      isOperating={systemStatus.isOperating}
      onForceValveClose={handleForceValveClose}
    >
      {/* 센서, 밸브, 서버 상태 표시창 */}
      <StatusSection>
        <StatusIndicators 
          temperatureSensor1Status={systemStatus.temperatureSensor1}
          waterValveStatus={systemStatus.waterValve}
          serverStatus={systemStatus.server}
        />
      </StatusSection>

      {/* 주차면 그리드 */}
      <ParkingGrid>
        {parkingSpaces.map(space => (
          <ParkingCell
            key={space.id}
            id={space.id}
            isActive={space.isActive}
            onToggle={handleToggle}
          />
        ))}
      </ParkingGrid>
    </Layout>
  );
};

export default ControlSystem; 