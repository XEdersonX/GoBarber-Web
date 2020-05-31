import React, { createContext, useCallback, useContext } from 'react';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

// Context
const ToastContext = createContext<ToastContextData>({} as ToastContextData); // inicializar como um objeto vazio.

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);
  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
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
