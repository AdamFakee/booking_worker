import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000/api/auth' 
  : 'http://localhost:3000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const authService = {
  login: async (phone: string) => {
    try {
      const response = await api.post('/login', { phone });
      return response.data;
    } catch (error) {
      console.error('Auth login error', error);
      throw error;
    }
  },

  verify: async (phone: string, otp: string) => {
    try {
      const response = await api.post('/verify', { phone, otp });
      return response.data;
    } catch (error) {
      console.error('Auth verify error', error);
      throw error;
    }
  },

  googleLogin: async (idToken: string) => {
    try {
      const response = await api.post('/google', { id_token: idToken });
      return response.data;
    } catch (error) {
      console.error('Google login error', error);
      throw error;
    }
  }
};
