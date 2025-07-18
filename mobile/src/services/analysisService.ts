import { apiRequest } from '../utils/api';

const API_BASE_URL = 'http://localhost:4000/api'; // API Gateway URL

export interface AnalysisJob {
  id: string;
  documentId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: any; // Define a more specific type as needed
  createdAt: string;
  completedAt?: string;
}

export async function requestAnalysis(token: string, documentId: string): Promise<AnalysisJob> {
  return apiRequest<AnalysisJob>(`${API_BASE_URL}/analysis`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ documentId }),
  });
}

export async function getAnalysisResult(token: string, jobId: string): Promise<AnalysisJob> {
  return apiRequest<AnalysisJob>(`${API_BASE_URL}/analysis/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} 