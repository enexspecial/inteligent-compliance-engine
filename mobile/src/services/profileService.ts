import { apiRequest } from '../utils/api';

const API_BASE_URL = 'http://localhost:4000/api'; // API Gateway URL

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  // Add more fields as needed
}

export async function getProfile(token: string): Promise<UserProfile> {
  return apiRequest<UserProfile>(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateProfile(token: string, data: Partial<UserProfile>): Promise<UserProfile> {
  return apiRequest<UserProfile>(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
} 