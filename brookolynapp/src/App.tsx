import 'react-native-gesture-handler';

import React from 'react';

import Routes from './routes';

import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const App: React.FC = () => (
    <>
    <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#312e38"/>
        <View style={{ flex:1, backgroundColor: '#302e38' }}>
            <Routes/>
        </View>
    </NavigationContainer>
    </>
);

export default App;
