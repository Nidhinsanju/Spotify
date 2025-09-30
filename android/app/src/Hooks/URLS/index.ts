import {PROD_BASE_URL} from '@env';

const BASE_URL = PROD_BASE_URL; // choose based on your environment

export const LOGIN_API = `${BASE_URL}api/users/login`;
export const SIGNUP_API = `${BASE_URL}api/users/create-user`;
