import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser === null || storedUser === 'undefined') {
        return null;
      }
      return JSON.parse(storedUser);
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApiRequest = useCallback(async (url: string, method: string, body?: any) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue');
      }
  
      const data = await response.json();
      if (!data) {
        throw new Error('No data received from API');
      }
  
      return data;
    } catch (err) {
      console.error('Error during API request:', err);
      throw err;
    }
  }, []);
  

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await handleApiRequest(`${API_URL}/auth/login`, 'POST', credentials);

      const userData: User = data.user;

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la connexion');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [handleApiRequest]);

  const register = useCallback(async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await handleApiRequest(`${API_URL}/auth/register`, 'POST', userData);

      const newUser: User = data.user;

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l\'inscription');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [handleApiRequest]);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(console.error);
  }, []);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
