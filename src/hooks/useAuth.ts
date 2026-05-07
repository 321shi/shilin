import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    const result = await api.getCurrentUser();
    
    if (result.error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setIsAuthenticated(true);
      setUser(result.data);
    }
    
    setIsLoading(false);
  };

  const login = async (username: string, password: string) => {
    const result = await api.login(username, password);
    
    if (result.error) {
      throw new Error(result.error);
    }

    const userResult = await api.getCurrentUser();
    if (userResult.data) {
      setUser(userResult.data);
    }
    
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await api.logout();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = async (data: { full_name?: string; bio?: string; avatar_url?: string }) => {
    const result = await api.updateUser(data);
    
    if (result.data) {
      setUser(result.data);
    }
    
    return result;
  };

  return { 
    isAuthenticated, 
    isLoading, 
    user,
    login, 
    logout,
    updateUser,
    checkAuth
  };
};
