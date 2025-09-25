import React, {useState} from 'react';
import bgImage from '../../../src/assets/public/musicBackground.jpg'; // Place your background image in assets folder
import spotifyLogo from '../../assets/public/spotifyLogo.png'; // Place Spotify logo in assets folder

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SignupScreenNavigationProp} from '../../types/navigation';

// Import your background image (adjust the path as needed)

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleLogin = () => {
    navigation.navigate('SpotifyHome');
    // Handle login logic here
  };

  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.logoContainer}>
          <Image source={spotifyLogo} style={styles.logo} />
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Sign in to Spotify</Text>
          <TextInput
            style={styles.input}
            placeholder="Email or username"
            placeholderTextColor="#b3b3b3"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#b3b3b3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.forgot}
              onPress={() => {
                navigation.navigate('PasswordRest');
              }}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.signup}>Sign up for Spotify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#191414',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: 'rgba(25,20,20,0.85)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  form: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#222326',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  forgot: {
    color: '#b3b3b3',
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  signup: {
    color: '#1DB954',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 16,
  },
});

export default Signin;
