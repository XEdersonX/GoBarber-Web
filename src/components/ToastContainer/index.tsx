import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../hooks/toast';
import { Container, Toast } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();

  return (
    <Container>
      {messages.map((message) => (
        // vai validar se tem propiedade description por !!
        <Toast
          key={message.id}
          type={message.type}
          hasDescription={!!message.description}
        >
          <FiAlertCircle size={20} />

          <div>
            <strong>{message.title}</strong>
            {/* Vou mostrar o p se eu tiver algo dentro do meu description. short  ren sintaxe */}
            {message.description && <p>{message.description}</p>}
          </div>

          <button onClick={() => removeToast(message.id)} type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
