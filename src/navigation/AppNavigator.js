import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';
import HomeScreen from '../screens/homeScreen';

import screenNames from '../helpers/screenNames';

const AppNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName={screenNames.Login} screenOptions={{
                headerShown: false
            }} >

            <Stack.Screen name={screenNames.Login} component={LoginScreen} />
            <Stack.Screen name={screenNames.SignUp} component={SignUpScreen} />
            <Stack.Screen name={screenNames.Home} component={HomeScreen} />

        </Stack.Navigator>
    );
}
export default AppNavigator;