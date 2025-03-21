import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ControlSystem from './pages/ControlSystem';

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
    background-color: #1B2430;
    color: white;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ControlSystem />
    </>
  );
};

export default App;
