import { apiRequest } from '../utils/api';

const API_BASE_URL = 'http://localhost:4000/api'; // API Gateway URL

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name: string;
    // Add more user fields as needed
  };
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logout(): Promise<void> {
  // If your backend supports logout endpoint, call it here
  // Otherwise, just clear tokens on the client
  return Promise.resolve();
}

export async function getCurrentUser(token: string): Promise<AuthResponse['user']> {
  return apiRequest<AuthResponse['user']>(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} 