import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type UserRole = 'customer' | 'worker' | null;

interface AuthContextType {
  role: UserRole;
  isLoading: boolean;
  signIn: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('user_role');
        if (storedRole) {
          setRole(storedRole as UserRole);
        }
      } catch (e) {
        console.error('Failed to load role', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadRole();
  }, []);

  /* 
  useEffect(() => {
    if (isLoading) return;

    // const inAuthGroup = segments[0] === 'worker-auth';
    const inTabs = segments[0] === '(tabs)';
    const inWorkerHome = segments[0] === 'worker-home';

    if (!role && inTabs) {
       // Customer can access tabs? Maybe not if strict auth.
       // For now, let's say if NOT logged in, go to index.
       router.replace('/');
    } else if (role === 'customer' && !inTabs) {
       // Redirect customer to tabs if not there
       router.replace('/(tabs)');
    } else if (role === 'worker' && !inWorkerHome) {
       // Redirect worker to home if not there
       // router.replace('/worker-home');
    }
  }, [role, isLoading, segments]);
  */

  // Note: The above auto-redirect logic can be tricky with complex flows. 
  // Simplified approach: Just expose signIn/signOut and let components navigate.
  // We'll keep the basic persistence logic but avoid aggressive redirects here to prevent loops during dev.

  const signIn = async (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
        await AsyncStorage.setItem('user_role', newRole);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user_role');
      setRole(null);
      console.log('User signed out, redirecting to /');
      router.replace('/' as any);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ role, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
