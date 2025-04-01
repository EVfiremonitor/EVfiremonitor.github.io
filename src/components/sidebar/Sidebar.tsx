import { useDispatch, useSelector } from 'react-redux';
import { setTestMode } from '../../store/parkingSlice';
import styled from 'styled-components';
import { RootState } from '../../store/store';

const SidebarContainer = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const TestButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const isTestMode = useSelector((state: RootState) => state.parking.isTestMode);

  const handleTestClick = () => {
    dispatch(setTestMode({ isActive: !isTestMode, targetId: 2 }));
  };

  return (
    <SidebarContainer>
      {/* ... existing sidebar content ... */}
      <TestButton onClick={handleTestClick}>
        {isTestMode ? '테스트 중지' : '테스트 시작'}
      </TestButton>
    </SidebarContainer>
  );
};

export default Sidebar; 