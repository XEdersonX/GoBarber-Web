import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

// interface para informar o formato do context
interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // as é para iniciar com um objeto vazio para o type scripty permitir isso.

// Criando componente
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // Verifico se existe a informacao de token e de usuario
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // Se ele nao encontrou nem um deles eu retorno objeto vazio.
    return {} as AuthState;
  });

  // Faz Autheticacao
  const signIn = useCallback(async ({ email, password }) => {
    // console.log('singIn');
    const response = await api.post('sessions', {
      email,
      password,
    });

    // console.log(response.data);
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // Se o context no foi criado
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// export default AuthContext;
export { AuthProvider, useAuth };
