import React from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// Initialize Google Signin
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your Google web client ID
});

interface OauthError {
  message: string;
}

const Oauth: React.FC = () => {
  // Google Sign In
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Alert.alert('Google Login Success', JSON.stringify(userInfo));
      // Handle userInfo (send to backend, etc.)
    } catch (error: unknown) {
      const err = error as OauthError;
      Alert.alert('Google Login Error', err?.message || 'Unknown error');
    }
  };

  //   // Apple Sign In
  //   const handleAppleLogin = async () => {
  //     try {
  //       const appleAuthRequestResponse = await appleAuth.performRequest({
  //         requestedOperation: appleAuth.Operation.LOGIN,
  //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //       });
  //       Alert.alert(
  //         'Apple Login Success',
  //         JSON.stringify(appleAuthRequestResponse),
  //       );
  //       // Handle appleAuthRequestResponse (send to backend, etc.)
  //     } catch (error) {
  //       Alert.alert('Apple Login Error', error?.message || 'Unknown error');
  //     }
  //   };

  // Gmail login is the same as Google login (Gmail is a Google service)

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={handleGoogleLogin} />
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  spacer: {
    height: 16,
  },
});

export default Oauth;
