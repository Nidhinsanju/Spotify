import React, {useState, useEffect, ComponentType} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login/login';
import Signup from '../screens/Signup/signup';
import Signin from '../screens/Signin/Signin';
import ResetPassword from '../screens/Resetpassword/ResetPassword';
import Home from '../screens/Home/Home';
import Layout from '../components/Layout/Layout';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // You’d normally check async storage / secure store / API token here
  useEffect(() => {
    const checkAuth = async () => {
      // Example: fetch token from storage
      const token = true; // replace with AsyncStorage.getItem("token")
      setIsAuthenticated(!!token);
      return !!token;
    };
    checkAuth();

  }, []);

  const withLayout = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <>
          <Stack.Screen
            name="SpotifyHome"
            component={withLayout(Home)}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
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
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
