import React, {ComponentType} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Layout from '../components/Layout/Layout';

export const ProtectedNav = () => {
  const Stack = createNativeStackNavigator();
  const withLayout = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={'SpotifyHome'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SpotifyHome"
        component={withLayout(Home)}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
