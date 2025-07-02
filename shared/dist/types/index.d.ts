export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
}
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    ANALYST = "analyst"
}
export declare enum NotificationType {
    EMAIL = "email",
    SMS = "sms",
    PUSH = "push"
}
export interface Document {
    id: string;
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    uploadedAt: string;
    processedAt?: string;
    analysisResults?: AnalysisResult;
    userId: string;
}
export declare enum DocumentStatus {
    UPLOADED = "uploaded",
    PROCESSING = "processing",
    ANALYZED = "analyzed",
    FAILED = "failed"
}
export interface AnalysisResult {
    id: string;
    documentId: string;
    complianceScore: number;
    issues: ComplianceIssue[];
    recommendations: string[];
    generatedAt: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
}
export interface ComplianceIssue {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    category: string;
    description: string;
    lineNumber?: number;
    suggestion?: string;
    ruleId?: string;
}
export declare enum IssueSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}
export interface JobStatus {
    id: string;
    type: 'document-processing' | 'compliance-analysis' | 'notification';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    createdAt: string;
    updatedAt: string;
    result?: any;
    error?: string;
}
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
    data?: any;
}
