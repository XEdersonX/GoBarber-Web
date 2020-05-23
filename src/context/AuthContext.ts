import { createContext } from 'react';

// interface para informar o formato do context
interface AuthContextData {
  name: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // as é para iniciar com um objeto vazio para o type scripty permitir isso.

export default AuthContext;
