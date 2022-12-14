import React, {useEffect, useState} from 'react';
import {LoginScreen} from '../screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/registerScreen';

export type RootStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
