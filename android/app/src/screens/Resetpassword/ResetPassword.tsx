import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = () => {
    if (!email) {
      Alert.alert('Please enter your email.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('reset');
      Alert.alert('Reset code sent to your email.');
    }, 1200);
  };

  const handleResetPassword = () => {
    if (!code || !password || !confirm) {
      Alert.alert('Please fill all fields.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Passwords do not match.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Password reset successful!');
      // Navigate to login or home
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.innerContainer}>
          <Text style={styles.logo}>Spotify</Text>
          <Text style={styles.title}>
            {step === 'email' ? 'Forgot your password?' : 'Reset your password'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 'email'
              ? 'Enter your Spotify account email and we’ll send you a code to reset your password.'
              : 'Enter the code sent to your email and your new password.'}
          </Text>
          {step === 'email' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#888"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendEmail}
                disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Sending...' : 'Send'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Reset code"
                placeholderTextColor="#888"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="New password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
                disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1DB954',
    alignSelf: 'center',
    marginBottom: 24,
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#b3b3b3',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    backgroundColor: '#222326',
    color: '#fff',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default ResetPassword;
