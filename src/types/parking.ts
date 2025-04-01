import { SystemStatus } from './common';

export interface ParkingData {
  id: number;
  temperature: number | null;
  isOpen?: boolean;
  isActive: boolean;
  isFireDetected?: boolean;
}

export interface SystemStatusData {
  isOperating: boolean;
  temperatureSensor1: SystemStatus;
  temperatureSensor2: SystemStatus;
  waterValve: SystemStatus;
  server: SystemStatus;
}

export interface TemperatureSettingsData {
  lightAlarm: number;
  mediumAlarm: number;
  fireSuppression: number;
}

export interface FireDetectionData {
  detectedCount: number;
  averageTemperature: number;
} 