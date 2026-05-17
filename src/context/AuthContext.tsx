import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../lib/api';
import { toast } from 'sonner';
import { formatStudentDate } from '../lib/dateUtils';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  updatedAt?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  signIn: (data: any) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  openAuthModal: (action?: () => void) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');
      const userFromUrl = urlParams.get('user');

      if (tokenFromUrl && userFromUrl) {
        localStorage.setItem('auth_token', tokenFromUrl);
        localStorage.setItem('auth_user', userFromUrl);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const savedUser = localStorage.getItem('auth_user');
      const savedToken = localStorage.getItem('auth_token');

      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Failed to parse user data", e);
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for cross-component auth changes (e.g. 401 errors)
    const handleAuthChange = () => {
      setUser(null);
    };

    window.addEventListener('auth-status-changed', handleAuthChange);
    return () => window.removeEventListener('auth-status-changed', handleAuthChange);
  }, []);

  const signIn = async (data: any) => {
    try {
      const response = await authApi.signIn(data);
      if (response.token && response.students) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response.students));
        setUser(response.students);
        toast.success("Welcome back!");
        
        // Execute pending action if it exists
        if (pendingAction) {
          pendingAction();
          setPendingAction(null);
        }
        setIsAuthModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const signUp = async (data: any) => {
    try {
      const response = await authApi.signUp(data);
      if (response.token && response.students) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response.students));
        setUser(response.students);
        toast.success("Account created successfully!");

        // Execute pending action if it exists
        if (pendingAction) {
          pendingAction();
          setPendingAction(null);
        }
        setIsAuthModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const signOut = async () => {
    // Optimistically clear local state for instant feedback
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    toast.info("Logged out successfully");

    try {
      // Perform server logout in the background
      await authApi.signOut();
    } catch (error) {
      console.error("Logout failed at server", error);
    }
  };

  const openAuthModal = (action?: () => void) => {
    if (action) setPendingAction(() => action);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthModalOpen, 
      signIn, 
      signUp, 
      signOut, 
      openAuthModal, 
      closeAuthModal 
    }}>
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
