import React from 'react';

import { 
    Container,
    Title,
    BackToSignIn,
    BackToSignInText
} from './styles';

import Icon from 'react-native-vector-icons/Feather'; 

import logoImg from '../../assets/logo.png';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
    const navgation = useNavigation();

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

                    <Input name='name' icon='user' placeholder='Nome'/>
                    
                    <Input name='email' icon='mail' placeholder='E-mail'/>

                    <Input name='password' icon='lock' placeholder='Senha'/>

                    <Button onPress={() => {}}>Entrar</Button>

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