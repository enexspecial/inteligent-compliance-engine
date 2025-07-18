import { apiRequest } from '../utils/api';

const API_BASE_URL = 'http://localhost:4000/api'; // API Gateway URL

export interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  // Add more fields as needed
}

export async function listDocuments(token: string): Promise<Document[]> {
  return apiRequest<Document[]>(`${API_BASE_URL}/documents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadDocument(token: string, file: any): Promise<Document> {
  // For file uploads, you may need to use FormData and a different fetch approach
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Document upload failed');
  }

  return response.json();
} 