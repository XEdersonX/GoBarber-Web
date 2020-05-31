import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

// Criando um objeto icons
const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  // Para disparar uma acao assim que este componente for exibindo em tela. QWuando novo toast for adicionado em tela.
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000); // setTimaerOut e quando que executar algo depois de um tanto de tempo. Executar depois de 3 segundos(3000).

    // a gente return uma funacao dentro de qualquer useEffect do react ela e aurtomaticamente execuada se componente deixar de existir. Caso ele seja deletado antes dos 3 segundos que determinamos para o timer
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} hasDescription={!!message.description}>
      {/* Botamos info como padrao, ja que propriedade type nao obrigatoria. Se ela nao tiver presente, vai ir o info como padrao. */}
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {/* Vou mostrar o p se eu tiver algo dentro do meu description. short  ren sintaxe */}
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
