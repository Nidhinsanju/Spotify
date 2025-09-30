interface LoginCredentials {
  email: string;
  password: string;
  userName: string;
}

interface SignupResponse {
  userName: string;
  ID: number;
  password: string;
}

interface ApiResponse {
  success: boolean;
  data?: SignupResponse;
  error?: string;
  status?: number;
  message: string;
}

import axios from 'axios';
import {SIGNUP_API} from '../URLS';

export default async function Signup_CALL(
  data: LoginCredentials,
): Promise<ApiResponse> {
  const {email, password, userName} = data;

  try {
    const res = await axios.post<SignupResponse>(
      SIGNUP_API,
      {
        email,
        password,
        userName,
      },
      {
        validateStatus: () => true, //Prevents Axios from throwing for non-2xx
      },
    );

    // ✅ Now Axios won’t throw — you can handle based on status
    if (res.status === 201) {
      return {
        success: true,
        message: 'Login successful!',
        data: res.data,
      };
    } else if (res.status === 400) {
      return {
        success: false,
        message: 'Invalid credentials. Please try again.',
      };
    } else if (res.status === 404) {
      return {
        success: false,
        message: 'Server not found. Please check your API URL.',
      };
    } else if (res.status === 500) {
      return {
        success: false,
        message: 'Internal server error. Please try later.',
      };
    } else {
      return {success: false, message: `Unexpected error (${res.status})`};
    }
  } catch (err) {
    console.log('Unexpected error:', err);
    return {
      success: false,
      message: 'Network error. Please check your connection.',
    };
  }
}
