import React, { useRef, useCallback } from 'react';

import { 
    Container,
    Title,
    BackToSignIn,
    BackToSignInText
} from './styles';

import Icon from 'react-native-vector-icons/Feather'; 
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import { 
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navgation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(async (data: SignUpFormData) => {

        try {
          formRef.current?.setErrors({});
    
          const schema = Yup.object().shape({
            name: Yup.string()
            .required('Nome obigatório'),
            email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
            password: Yup.string()
            .required('Senha obrigatória')
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });
    
        //   await signIn({
        //     email: data.email,
        //     password: data.password,
        //   });
    
        //   history.push('/dashboard')
        } catch(err) {
          if(err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
    
            formRef.current?.setErrors(errors);
    
            return;
          }

          Alert.alert('Erro na authenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais.')
        }
      },[]);
    

    return(
        <>
        <KeyboardAvoidingView
            style={{ flex:1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    <Image source={logoImg}/>
                    <View>
                        <Title>Crie sua conta</Title>
                    </View>
                    <Form ref={formRef} onSubmit={handleSignUp}>
                        <Input
                            autoCapitalize='words'
                            name='name' 
                            icon='user' 
                            placeholder='Nome'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                emailInputRef.current?.focus();
                            }}
                        />
                        
                        <Input
                            ref={emailInputRef}
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            name='email' 
                            icon='mail' 
                            placeholder='E-mail'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus();
                            }}
                        />

                        <Input
                            ref={passwordInputRef}
                            name='password' 
                            icon='lock' 
                            placeholder='Senha'
                            textContentType='newPassword'
                            returnKeyType='send'
                            secureTextEntry
                            onSubmitEditing={() => formRef.current?.submitForm()}
                        />
                    </Form>

                    <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <BackToSignIn onPress={() => navgation.navigate('SignIn')}>
            <Icon name='arrow-left' size={20} color="#ffff"/>
            <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
        </>
    );
};

export default SignIn;