import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login/login';
import Signup from '../screens/Signup/signup';
import Signin from '../screens/Signin/Signin';
import ResetPassword from '../screens/Resetpassword/ResetPassword';

export const AuthNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'InitalPage'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="InitalPage"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordRest"
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
