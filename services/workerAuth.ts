import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for emulator
const API_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000/api/worker-auth' 
  : 'http://localhost:3000/api/worker-auth';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export interface SendOtpResponse {
  success: boolean;
  message: string;
  debug_otp?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface WorkerAuthService {
  sendOtp: (phone: string) => Promise<SendOtpResponse>;
  verifyOtp: (phone: string, otp: string) => Promise<VerifyOtpResponse>;
  verifyIdentity: (phone: string, images: any) => Promise<any>;
  getQuiz: (jobs: string[]) => Promise<any>;
  saveInfo: (phone: string, name: string, jobs: string[]) => Promise<any>;
}

export const workerAuthService: WorkerAuthService = {
  sendOtp: async (phone: string) => {
    try {
      const response = await api.post('/send-otp', { phone });
      return response.data;
    } catch (error) {
      console.error('Send OTP api error', error);
      throw error;
    }
  },

  verifyOtp: async (phone: string, otp: string) => {
    try {
      const response = await api.post('/verify-otp', { phone, otp });
      return response.data;
    } catch (error) {
      console.error('Verify OTP api error', error);
      throw error;
    }
  },

  verifyIdentity: async (phone: string, images: any) => {
    try {
      const response = await api.post('/kyc', { phone, images });
      return response.data;
    } catch (error) {
      console.error('KYC api error', error);
      throw error;
    }
  },

  getQuiz: async (jobs: string[]) => {
    try {
      const response = await api.post('/quiz', { jobs });
      return response.data;
    } catch (error) {
      console.error('Get Quiz api error', error);
      throw error;
    }
  },

  saveInfo: async (phone: string, name: string, jobs: string[]) => {
    try {
      const response = await api.post('/save-info', { phone, name, jobs });
      return response.data;
    } catch (error) {
      console.error('Save Info api error', error);
      throw error;
    }
  }
};
