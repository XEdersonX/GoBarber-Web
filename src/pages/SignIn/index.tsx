import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // console.log(formRef);

  // const { user, signIn } = useContext(AuthContext); // Obter informacao do nosso context
  const { signIn } = useAuth(); // Obter informacao do nosso context
  const { addToast } = useToast();

  // console.log(user);

  // Utiliza o useCallback quando vai criar uma funcao dentro de um componente
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      // console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false, // esta propriedade vai retornar todos os erros que ele encontrar e nao so o primeiro erro.
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          // Este ponto de interrogacao serve para ver se esta variavel exite pra depois chamar o setErrros.
          formRef.current?.setErrors(errors);
        }

        // disparar um toast
        addToast();
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
