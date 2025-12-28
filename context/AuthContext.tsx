import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type VerificationStatus = 'new' | 'info_submitted' | 'ekyc_completed' | 'verified' | 'vip';

interface UserData {
  isLoggedIn: boolean;
  isWorker: boolean; // Has registered as a worker (verified ID)
  isWorkerActive: boolean; // Worker mode is currently active
  verificationStatus: VerificationStatus;
}

interface AuthContextType {
  user: UserData;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  registerAsWorker: () => Promise<void>; // Start worker flow
  updateVerificationStatus: (status: VerificationStatus) => Promise<void>;
  toggleWorkerActive: () => Promise<void>; // Toggle worker active status
}

const defaultUserData: UserData = {
  isLoggedIn: false,
  isWorker: false,
  isWorkerActive: false,
  verificationStatus: 'new',
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUserData,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  registerAsWorker: async () => {},
  updateVerificationStatus: async () => {},
  toggleWorkerActive: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUserData);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('user_data');
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  const saveUserData = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  };

  const signIn = async () => {
    const newUserData: UserData = {
      ...user,
      isLoggedIn: true,
      // Keep existing worker state if re-logging in
      isWorker: user.isWorker || false,
      verificationStatus: user.verificationStatus || 'new',
    };
    await saveUserData(newUserData);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user_data');
      setUser(defaultUserData);
      console.log('User signed out, redirecting to /');
      router.replace('/' as any);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const registerAsWorker = async () => {
    // Called when user clicks "Register as Worker"
    const newUserData: UserData = {
      ...user,
      isWorker: true,
      verificationStatus: 'new', // Reset or start as new
      isWorkerActive: false,
    };
    await saveUserData(newUserData);
  };

  const updateVerificationStatus = async (status: VerificationStatus) => {
    const newUserData: UserData = {
      ...user,
      verificationStatus: status,
      // If verified or vip, allow setting active, otherwise force inactive?
      // actually, just updating status here.
    };
    await saveUserData(newUserData);
  };

  const toggleWorkerActive = async () => {
    if (!user.isWorker) {
      console.warn('User is not registered as a worker');
      return;
    }
    
    // Only allow active if verified or vip
    if (user.verificationStatus !== 'verified' && user.verificationStatus !== 'vip') {
        alert('Vui lòng hoàn tất xác thực để bật trạng thái hoạt động.');
        return;
    }

    const newUserData: UserData = {
      ...user,
      isWorkerActive: !user.isWorkerActive,
    };
    await saveUserData(newUserData);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, registerAsWorker, updateVerificationStatus, toggleWorkerActive }}>
      {children}
    </AuthContext.Provider>
  );
}
