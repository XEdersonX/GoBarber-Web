import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouterProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// function checkAuth()

// Rota privada /  Autenticado
// true/true = ok
// true/false = Redirecionar ele pro login
// false/true = Redirecionar ele pro Dashboard
// false/false = ok

// o valor padrao isPrivate e false, se ela nao tiver presente
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  console.log(user, isPrivate);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? ( // !!user verifica seuser existe
          <Component />
        ) : (
          // else
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { location }, // location é para mater o historico
            }}
          /> // Sele tiver acessando rota autenticada e nao tiver autenticado eu mando ela para login
        );
      }}
    />
  );
};

export default Route;
