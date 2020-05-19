import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

// Subscreve fazendo o parametro nome seja obrigatorio, ja que ele nao é no padrao
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // para quando quero receber componente como uma propriedade
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />} {/* // Verificacao se o icon existir */}
    <input {...rest} />
  </Container>
);

export default Input;
