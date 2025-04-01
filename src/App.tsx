import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { theme, darkTheme } from './styles/theme';
import ControlSystem from './pages/ControlSystem';
import { useTestMode } from './hooks/useTestMode';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import FireAlarmModal from './components/modal/FireAlarmModal';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  button {
    &:disabled {
      background-color: ${({ theme }) => theme.colors.button.disabled};
      color: ${({ theme }) => theme.colors.text.disabled};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.text.primary};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

const App = () => {
  const [isDarkMode] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [alarmData, setAlarmData] = useState<{ id: number; temperature: number } | null>(null);
  
  const { spaces } = useSelector((state: RootState) => state.parking);
  
  useTestMode();

  useEffect(() => {
    const detectedSpace = spaces.find(space => 
      space.isFireDetected && 
      (!space.lastAlertTime || Date.now() - space.lastAlertTime > 30000) &&
      (!space.forceValveCloseTime || Date.now() - space.forceValveCloseTime > 600000)
    );

    if (detectedSpace) {
      setAlarmData({ id: detectedSpace.id, temperature: detectedSpace.temperature });
      setShowAlarm(true);
    }
  }, [spaces]);

  const handleCloseAlarm = () => {
    setShowAlarm(false);
    setAlarmData(null);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <GlobalStyle />
      <ControlSystem />
      {showAlarm && alarmData && (
        <FireAlarmModal
          parkingId={alarmData.id}
          temperature={alarmData.temperature}
          onClose={handleCloseAlarm}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
