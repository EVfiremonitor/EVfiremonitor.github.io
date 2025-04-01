import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateTemperature, updateLastAlertTime } from '../store/parkingSlice';

export const useTestMode = () => {
  const dispatch = useDispatch();
  const { 
    isTestMode, 
    testTargetId, 
    spaces,
    fireThreshold 
  } = useSelector((state: RootState) => state.parking);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('Test Mode:', { isTestMode, testTargetId, spaces });
    
    if (!isTestMode || !testTargetId) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const targetSpace = spaces.find(s => s.id === testTargetId);
    if (!targetSpace) {
      console.log('Target space not found');
      return;
    }

    console.log('Starting temperature increase for space:', targetSpace);

    intervalRef.current = setInterval(() => {
      const currentTemp = targetSpace.temperature;
      console.log('Current temperature:', currentTemp);
      
      if (currentTemp >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      const newTemp = Math.min(currentTemp + 1, 100);
      console.log('Updating temperature to:', newTemp);
      
      dispatch(updateTemperature({ id: testTargetId, temperature: newTemp }));

      // 화재 감지 온도 초과시 알람 업데이트
      if (newTemp >= fireThreshold.suppression && !targetSpace.isFireDetected) {
        dispatch(updateLastAlertTime(testTargetId));
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTestMode, testTargetId, dispatch, spaces, fireThreshold]);
}; 