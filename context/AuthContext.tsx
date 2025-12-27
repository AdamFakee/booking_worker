import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserData {
  isLoggedIn: boolean;
  isWorker: boolean; // Has registered as a worker (verified ID)
  isWorkerActive: boolean; // Worker mode is currently active
}

interface AuthContextType {
  user: UserData;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  registerAsWorker: () => Promise<void>; // After ID verification
  toggleWorkerActive: () => Promise<void>; // Toggle worker active status
}

const defaultUserData: UserData = {
  isLoggedIn: false,
  isWorker: false,
  isWorkerActive: false,
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUserData,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  registerAsWorker: async () => {},
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
      isLoggedIn: true,
      isWorker: false,
      isWorkerActive: false,
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
    // Called after ID verification is complete
    const newUserData: UserData = {
      ...user,
      isWorker: true,
      isWorkerActive: false, // Default to inactive
    };
    await saveUserData(newUserData);
  };

  const toggleWorkerActive = async () => {
    if (!user.isWorker) {
      console.warn('User is not registered as a worker');
      return;
    }
    const newUserData: UserData = {
      ...user,
      isWorkerActive: !user.isWorkerActive,
    };
    await saveUserData(newUserData);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, registerAsWorker, toggleWorkerActive }}>
      {children}
    </AuthContext.Provider>
  );
}
