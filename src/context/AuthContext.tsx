import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

// interface para informar o formato do context
interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // as é para iniciar com um objeto vazio para o type scripty permitir isso.

// Criando componente
const AuthProvider: React.FC = ({ children }) => {
  // Faz Autheticacao
  const signIn = useCallback(async ({ email, password }) => {
    // console.log('singIn');
    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Diego', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
export { AuthContext, AuthProvider };
