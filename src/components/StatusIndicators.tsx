import styled from 'styled-components';

const StatusContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatusItem = styled.div<{ status: string }>`
  background-color: ${({ theme, status }) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return theme.colors.status.normal;
      case 'warning':
        return theme.colors.status.warning;
      case 'danger':
        return theme.colors.status.danger;
      default:
        return theme.colors.status.inactive;
    }
  }};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatusLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default StatusItem; 