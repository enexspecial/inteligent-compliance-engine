import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, ApiResponse } from '../../../shared/types';
import { authApiClient } from '../../../shared/utils/api.utils';
import { API_ENDPOINTS, STORAGE_KEYS } from '../../../shared/constants';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (storedToken) {
          setToken(storedToken);
          // Validate token and get user data
          try {
            const response = await authApiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.PROFILE, storedToken);
            if (response.success && response.data) {
              setUser(response.data);
            } else {
              // Token is invalid, clear it
              await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
              setToken(null);
            }
          } catch (error) {
            console.error('Failed to validate token:', error);
            await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            setToken(null);
          }
        }
      } catch (error) {
        console.error('Failed to load auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApiClient.post<ApiResponse<{ user: User; token: string }>>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.success && response.data) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        setToken(authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData));
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApiClient.post<ApiResponse<{ user: User; token: string }>>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );

      if (response.success && response.data) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        setToken(authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData));
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const response = await authApiClient.put<ApiResponse<User>>(
        API_ENDPOINTS.USERS.UPDATE,
        userData,
        token || undefined
      );

      if (response.success && response.data) {
        setUser(response.data);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.data));
      } else {
        throw new Error(response.error || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 