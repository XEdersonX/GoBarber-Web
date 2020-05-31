import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      // Efeito para message entrar e sair de tela girando.
      // from: { right: '-120%', opacity: 0, transform: 'rotateZ(0deg)' },
      // enter: { right: '0%', opacity: 1, transform: 'rotateZ(360deg)' },
      // leave: { right: '-120%', opacity: 0, transform: 'rotateZ(0deg)' },

      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        // vai validar se tem propiedade description por !!
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
