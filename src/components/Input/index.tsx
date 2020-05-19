import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

// Subscreve fazendo o parametro nome seja obrigatorio, ja que ele nao é no padrao
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // para quando quero receber componente como uma propriedade
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Assim que componente for exido em tela
  useEffect(() => {
    // Unforme
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />} {/* // Verificacao se o icon existir */}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};

export default Input;
