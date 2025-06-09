import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import musicBackground from '../../assets/public/musicBackground.jpg';
import spotifylogo from '../../assets/public/spotifyLogo.png';

function Login() {
  const button = [
    {
      id: 1,
      title: 'Sign Up free',
      style: styles.signUpButton,
    },
    {
      id: 2,
      title: 'Continue With Google',
      style: styles.googleButton,
    },
    {
      id: 3,
      title: 'Continue with Facebook',
      style: styles.faceBookButton,
    },
    {
      id: 4,
      title: 'Continue with Apple',
      style: styles.appleButton,
    },
    {
      id: 5,
      title: 'Log in',
      style: styles.LoginButton,
    },
  ];

  return (
    <ImageBackground
      source={musicBackground} // or use a URL
      style={styles.background}
      imageStyle={{opacity: 0.7}} // transparency for image
    >
      <View style={styles.loginContainer}>
        <Image source={spotifylogo} style={styles.logo} />
        <View style={styles.loginTextContainer}>
          <Text style={styles.LoginHighlightText}>Millions of Songs.</Text>
          <Text style={styles.LoginHighlightText}> Free on Spotfiy</Text>
        </View>
        <View style={styles.buttonContainer}>
          {button?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={item.style}
                onPress={() => {
                  console.log(item.id, 'clicked');
                }}>
                <Text style={styles.buttonText}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  background: {
    flex: 1,
    resizeMode: 'stretch', // covers entire screen
    backgroundColor: 'black',
    marginTop: 0,
    paddingHorizontal: 24,
  },
  signUpButton: {
    margin: 4,
    color: 'black',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'solid', // optional, default is 'solid'
    borderRadius: 20,
    paddingTop: 8.5,
    paddingBottom: 8.5,
    backgroundColor: '#1ED760',
  },
  googleButton: {
    margin: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid', // optional, default is 'solid'
    borderRadius: 20,
    paddingTop: 8.5,
    paddingBottom: 8.5,
  },
  faceBookButton: {
    margin: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid', // optional, default is 'solid'
    borderRadius: 20,
    paddingTop: 8.5,
    paddingBottom: 8.5,
  },
  appleButton: {
    margin: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid', // optional, default is 'solid'
    borderRadius: 20,
    paddingTop: 8.5,
    paddingBottom: 8.5,
  },
  LoginButton: {
    margin: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  buttonStyle: {
    borderRadius: '10px',
  },
  loginTextContainer: {
    color: 'white',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  LoginHighlightText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Avenir Next',
    display: 'flex',
  },
  textColor: {
    color: 'white',
  },
  sectionContainer: {
    backgroundColor: 'black',
  },
});

export default Login;
