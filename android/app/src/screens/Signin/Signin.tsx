import React, {useContext, useState} from 'react';
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
  Alert,
} from 'react-native';

import bgImage from '../../../src/assets/public/musicBackground.jpg';
import spotifyLogo from '../../assets/public/spotifyLogo.png';
import Login_CALL from '../../Hooks/API/Login';
import {AuthContext} from '../../navigation/AppContext';
import PushNotification from 'react-native-push-notification';

const Signin: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{email?: string; password?: string}>({});
  const auth = useContext(AuthContext);

  const validateValues = () => {
    let valid = true;
    let errors: {email?: string; password?: string} = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else {
      // ✅ Email regex validation
      if (email && !emailRegex?.test(email)) {
        errors.email = 'Enter a valid email or username';
        valid = false;
      } else {
        valid = true;
      }
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateValues()) return;
    const payload = {
      email: email,
      password: password,
    };
    const {success, data, message} = await Login_CALL(payload);
    if (success && data?.token) {
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'Login Successful',
        message: 'Welcome back!',
        playSound: true,
        soundName: 'default',
        importance: 4,
        priority: 'high',
        vibrate: true,
      });
      Alert.alert('Logged in Successfully');
      auth.login(data?.token); // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'SpotifyHome'}],
      // });
      // Notification('default-channel-id', 'Sucess', 'Logged In Successfully');
    } else {
      console.log('Something went wrong', message);
    }
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
            onChangeText={text => {
              setEmail(text);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {error.email && <Text style={styles.errorText}>{error.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#b3b3b3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error.password && (
            <Text style={styles.errorText}>{error.password}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('PasswordRest')}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
    marginBottom: 8,
    fontSize: 16,
  },
  errorText: {
    color: '#ff4d4d',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 13,
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
