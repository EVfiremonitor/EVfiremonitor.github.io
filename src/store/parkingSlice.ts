import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParkingSpace {
  id: number;
  isOpen: boolean;
  temperature: number;
  isFireDetected: boolean;
  lastAlertTime: number | null;
  forceValveCloseTime: number | null;
}

interface FireThreshold {
  light: number;
  medium: number;
  suppression: number;
}

interface ParkingState {
  spaces: ParkingSpace[];
  fireThreshold: FireThreshold;
  isTestMode: boolean;
  testTargetId: number | null;
  temperatureSettings: {
    lightAlarm: number;
    mediumAlarm: number;
    fireSuppression: number;
  };
}

const ALERT_COOLDOWN_MS = 60 * 1000; // 1분

const initialState: ParkingState = {
  spaces: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    isOpen: false,
    temperature: 35,
    isFireDetected: false,
    lastAlertTime: null,
    forceValveCloseTime: null
  })),
  fireThreshold: {
    light: 45,
    medium: 55,
    suppression: 65
  },
  isTestMode: false,
  testTargetId: null,
  temperatureSettings: {
    lightAlarm: 45,
    mediumAlarm: 55,
    fireSuppression: 60
  }
};

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    toggleParkingStatus: (state, action: PayloadAction<number>) => {
      const space = state.spaces.find(s => s.id === action.payload);
      if (space) {
        space.isOpen = !space.isOpen;
      }
    },
    updateTemperature: (state, action: PayloadAction<{ id: number; temperature: number }>) => {
      const space = state.spaces.find(s => s.id === action.payload.id);
  if (space) {
    space.temperature = action.payload.temperature;

    const { suppression } = state.fireThreshold;
    const isOverThreshold = action.payload.temperature >= suppression;
    space.isFireDetected = isOverThreshold;

    const now = Date.now();

    // 조건: 온도가 기준 이상 + 마지막 알람 발생 시간이 오래됨
    const isReadyToAlert =
      isOverThreshold &&
      (!space.lastAlertTime || now - space.lastAlertTime > ALERT_COOLDOWN_MS);

    if (isReadyToAlert) {
      space.lastAlertTime = now;
      // 여기에 알람 관련 트리거 로직 삽입 (예: 외부 리스너에서 처리)
    }
  }
    },
    setTestMode: (state, action: PayloadAction<{ isActive: boolean; targetId?: number }>) => {
      state.isTestMode = action.payload.isActive;
      state.testTargetId = action.payload.targetId || null;
    },
    setForceValveClose: (state, action: PayloadAction<number>) => {
      const space = state.spaces.find(s => s.id === action.payload);
      if (space) {
        space.forceValveCloseTime = Date.now();
        space.isFireDetected = false;
      }
    },
    updateLastAlertTime: (state, action: PayloadAction<number>) => {
      const space = state.spaces.find(s => s.id === action.payload);
      if (space) {
        space.lastAlertTime = Date.now();
      }
    },
    setFireThreshold: (state, action: PayloadAction<Partial<FireThreshold>>) => {
      state.fireThreshold = { ...state.fireThreshold, ...action.payload };
    },
    
    setTemperatureManually: (state, action: PayloadAction<{ id: number; temperature: number }>) => {
      const space = state.spaces.find(s => s.id === action.payload.id);
      if (space) {
        space.temperature = action.payload.temperature;
        const { light, medium, suppression } = state.fireThreshold;
        space.isFireDetected = action.payload.temperature >= light;
        // 추가적으로, 단계 판단 값도 넣고 싶다면 새로운 필드(예: fireLevel)를 넣어도 좋습니다.
      }
    },
    updateTemperatureSettings: (state, action: PayloadAction<{
      type: 'lightAlarm' | 'mediumAlarm' | 'fireSuppression';
      value: number;
    }>) => {
      state.temperatureSettings[action.payload.type] = action.payload.value;
      // fireSuppression 온도가 변경되면 fireThreshold도 같이 업데이트
      if (action.payload.type === 'fireSuppression') {
        state.fireThreshold.suppression = action.payload.value;
      } else if (action.payload.type === 'lightAlarm') {
        state.fireThreshold.light = action.payload.value;
      } else if (action.payload.type === 'mediumAlarm') {
        state.fireThreshold.medium = action.payload.value;
      }
    }
  }
});

export const {
  toggleParkingStatus,
  updateTemperature,
  setTestMode,
  setForceValveClose,
  updateLastAlertTime,
  updateTemperatureSettings
} = parkingSlice.actions;

export default parkingSlice.reducer; 