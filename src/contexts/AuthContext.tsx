import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';
import { mockUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({ ...mockUser, email });
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    // Mock signup - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({ ...mockUser, name, email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
