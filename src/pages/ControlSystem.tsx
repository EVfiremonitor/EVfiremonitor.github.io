import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import StatusIndicators from '../components/dashboard/StatusIndicators';
import ParkingCell from '../components/dashboard/ParkingCell';
import { SystemStatusData, ParkingData, TemperatureSettings, FireDetectionData } from '../types/parking';
import { BaseProps } from '../types/common';
import Layout from '../components/layout/Layout';
import { BREAKPOINTS } from '../styles/breakpoints';

const StatusSection = styled.section`
  background-color: rgba(10, 38, 71, 0.5);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(8px);
`;

const ParkingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: ${BREAKPOINTS.desktop}) {
    grid-template-columns: repeat(3, 1fr); // Desktop: 3열
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    grid-template-columns: 1fr; // Mobile: 1열
    gap: 1rem;
  }
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

  const [parkingData, setParkingData] = useState<ParkingData[]>([
    { id: 1, temperature: null, isActive: false },
    { id: 2, temperature: 32, isOpen: true, isActive: true },
    { id: 3, temperature: 72, isOpen: true, isActive: true, isFireDetected: true },
    { id: 4, temperature: 34, isOpen: true, isActive: true },
    { id: 5, temperature: 35, isOpen: true, isActive: true },
    { id: 6, temperature: null, isActive: false },
    { id: 7, temperature: null, isActive: false }
  ]);

  const [temperatureSettings] = useState<TemperatureSettings>({
    lightAlarm: 45,
    mediumAlarm: 55,
    fireSuppression: 65
  });

  const [fireDetection] = useState<FireDetectionData>({
    detectedCount: 72,
    averageTemperature: 32
  });

  const handleForceValveClose = (): void => {
    // 밸브 강제 종료 로직 구현
    console.log('Force valve close');
  };

  return (
    <Layout 
      isOperating={systemStatus.isOperating}
      onForceValveClose={handleForceValveClose}
    >
      <StatusSection>
        <StatusIndicators 
          temperatureSensor1Status={systemStatus.temperatureSensor1}
          temperatureSensor2Status={systemStatus.temperatureSensor2}
          waterValveStatus={systemStatus.waterValve}
          serverStatus={systemStatus.server}
        />
      </StatusSection>
      <ParkingGrid>
        {parkingData.map(parking => (
          <ParkingCell
            key={parking.id}
            {...parking}
          />
        ))}
      </ParkingGrid>
    </Layout>
  );
};

export default ControlSystem; 