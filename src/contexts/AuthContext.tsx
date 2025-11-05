import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { registerUser, verifyToken } from '../api/auth';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string,
    role: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role from backend
  const fetchUserRole = async () => {
    try {
      const response = await verifyToken();
      setUserRole(response.role);
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      return response.role;
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
      localStorage.removeItem('user');
      return null;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      // Clear any stale cached user before new login
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);

      // Force token refresh to propagate any updated custom claims
      await userCredential.user.getIdToken(true);

      // Fetch role from backend immediately after login
      await fetchUserRole();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string,
    role: string
  ) => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Register in backend
      await registerUser({
        uid: user.uid,
        fullName,
        email,
        phone,
        address,
        role,
      });

      setCurrentUser(user);
      setUserRole(role);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      setUserRole(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Refresh user role
  const refreshUserRole = async () => {
    if (currentUser) {
      await fetchUserRole();
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Force a token refresh so custom claims and backend auth are in sync
        try {
          await user.getIdToken(true);
        } catch (_) {}
        // Fetch role when user logs in
        await fetchUserRole();
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
