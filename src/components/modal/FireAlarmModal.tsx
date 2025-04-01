import React from 'react';
import styled, { keyframes } from 'styled-components';

const blinkAnimation = keyframes`
  0% { background-color: rgba(255, 0, 0, 0.9); }
  50% { background-color: rgba(255, 0, 0, 0.7); }
  100% { background-color: rgba(255, 0, 0, 0.9); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${blinkAnimation} 1s infinite;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.status.danger};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CloseButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background-color: ${({ theme }) => theme.colors.status.danger};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

interface FireAlarmModalProps {
  parkingId: number;
  temperature: number;
  onClose: () => void;
}

const FireAlarmModal: React.FC<FireAlarmModalProps> = ({
  parkingId,
  temperature,
  onClose
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Title>화재 경보</Title>
        <Message>
          주차면 {parkingId}번에서 화재가 감지되었습니다!
          <br />
          현재 온도: {temperature}°C
        </Message>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FireAlarmModal; 