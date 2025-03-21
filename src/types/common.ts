export type ButtonVariant = 'default' | 'warning' | 'danger';

export type SystemStatus = 'Normal' | 'Error' | 'Warning';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface WithChildren {
  children: React.ReactNode;
} 