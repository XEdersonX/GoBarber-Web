import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string; // ponto ? é pq nao é obrigatorio colocar
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

// Context
const ToastContext = createContext<ToastContextData>({} as ToastContextData); // inicializar como um objeto vazio.

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]); // Melhor lugar para armazenar qualquer informacao e no estadoda nossa aplicacao

  // omit ele pega toas as propriedades da interface menos id
  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      // console.log('addToast');
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      // setMessages([...messages, toast]); // copio todos que tem la dentro. espeitando os conceitos de mutabilidade do react.
      setMessages((oldMessages) => [...oldMessages, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    // console.log('removeToast');
    // Pegando stado atual das messagens pelo state
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

// Hook
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  // Verfica se o context nao existir
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
