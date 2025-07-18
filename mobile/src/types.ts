// types.ts - Local type definitions for the mobile app

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  createdAt?: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  // Add more fields as needed
}

export interface AnalysisJob {
  id: string;
  documentId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: any; // Define a more specific type as needed
  createdAt: string;
  completedAt?: string;
} 