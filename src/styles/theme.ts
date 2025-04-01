// 먼저 타입을 정의합니다
export interface Theme {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    background: {
      primary: string;
      secondary: string;
      dark: string;
      overlay: string;
    };
    status: {
      normal: string;
      warning: string;
      danger: string;
      inactive: string;
    };
    text: {
      white: string;
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: string;
    button: {
      primary: string;
      hover: string;
      disabled: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    cell: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

// styled-components의 DefaultTheme 확장
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// 테마 구현
export const theme: Theme = {
  colors: {
    primary: {
      main: '#FFFFFF',
      light: '#F8FAFC',
      dark: '#F1F5F9'
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
      dark: '#CBD5E1',
      overlay: 'rgba(0, 0, 0, 0.1)'
    },
    status: {
      normal: '#03c75a',
      warning: '#FBBF24',
      danger: '#EF4444',
      inactive: '#94A3B8'
    },
    text: {
      white: '#ffffff',
      primary: '#1E293B',
      secondary: '#64748B',
      disabled: '#CBD5E1'
    },
    border: 'rgba(0, 0, 0, 0.1)',
    button: {
      primary: '#3B82F6',
      hover: '#2563EB',
      disabled: '#CBD5E1'
    }
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 10px rgba(0, 0, 0, 0.25)',
    cell: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  }
};

// 다크 테마도 동일한 타입을 사용
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      main: '#1a1a1a',
      light: '#2d2d2d',
      dark: '#000000'
    },
    background: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      dark: '#000000',
      overlay: 'rgba(0, 0, 0, 0.7)'
    }
  }
};