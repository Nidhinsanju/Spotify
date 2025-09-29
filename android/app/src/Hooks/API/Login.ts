interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  userName: string;
  ID: number;
  token: string;
}

interface ApiResponse {
  success: boolean;
  data?: LoginResponse;
  error?: string;
  status?: number;
}

import axios from 'axios';
import {LOGIN_API} from '../URLS';

export default async function Login_CALL(
  data: LoginCredentials,
): Promise<ApiResponse> {
  const {email, password} = data;

  try {
    const res = await axios.post<LoginResponse>(LOGIN_API, {
      userName: email,
      password,
    });


    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (err: any) {
    console.error(err, 'this is err');

    return {
      success: false,
      error:
        err.response?.data?.message || err.message || 'Something went wrong',
      status: err.response?.status,
    };
  }
}
