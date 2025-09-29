// types/navigation.ts
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// 1️⃣ Define all your screen names and their params
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Signin: undefined;
  Auth: undefined;
  PasswordRest: undefined;
  SpotifyHome: undefined;
};

// 2️⃣ Create a navigation prop type for Login screen

export type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signin'
>;

export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

export type ResetPassowrdScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PasswordRest'
>;
