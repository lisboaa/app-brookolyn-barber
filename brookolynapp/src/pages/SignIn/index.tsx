import React, { useCallback, useRef } from 'react';

import { 
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather'; 

import logoImg from '../../assets/logo.png';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {

    const handleSignIn = useCallback((data: object) => {
        console.log(data);
        
    }, []);

    const navgation = useNavigation();
    const passwordInputRef = useRef<TextInput>(null);
    const formRef = useRef<FormHandles>(null);

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
                        <Title>Faça seu logon</Title>
                    </View>

                    <Form ref={formRef} onSubmit={handleSignIn}>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='email-address'
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
                            secureTextEntry
                            returnKeyType='send'
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                            />

                    </Form>
                        <Button onPress={() => { formRef.current?.submitForm()}}>
                            Entrar
                        </Button>

                    <ForgotPassword>
                        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <CreateAccountButton onPress={() => navgation.navigate('SignUp')}>
            <Icon name='log-in' size={20} color="#ff9000"/>
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
        </>
    );
};

export default SignIn;