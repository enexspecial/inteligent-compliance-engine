"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BREAKPOINTS = exports.COLORS = exports.VALIDATION_RULES = exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGES = exports.LANGUAGES = exports.THEMES = exports.STORAGE_KEYS = exports.UPLOAD_TIMEOUT = exports.API_TIMEOUT = exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = exports.NOTIFICATION_TYPES = exports.JOB_TYPES = exports.USER_ROLES = exports.SEVERITY_LEVELS = exports.STATUS_TYPES = exports.MAX_FILE_SIZE = exports.SUPPORTED_FILE_TYPES = exports.API_ENDPOINTS = void 0;
// API Endpoints
exports.API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        PROFILE: '/auth/profile',
    },
    USERS: {
        BASE: '/users',
        PROFILE: '/users/profile',
        UPDATE: '/users/profile',
    },
    DOCUMENTS: {
        BASE: '/documents',
        UPLOAD: '/documents/upload',
        DOWNLOAD: '/documents/download',
        DELETE: '/documents/delete',
    },
    ANALYSIS: {
        BASE: '/analysis',
        START: '/analysis/start',
        STATUS: '/analysis/status',
        RESULTS: '/analysis/results',
    },
    JOBS: {
        BASE: '/jobs',
        STATUS: '/jobs/status',
        CANCEL: '/jobs/cancel',
    },
    NOTIFICATIONS: {
        BASE: '/notifications',
        MARK_READ: '/notifications/mark-read',
        MARK_ALL_READ: '/notifications/mark-all-read',
    },
};
// File Types
exports.SUPPORTED_FILE_TYPES = {
    PDF: 'application/pdf',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    DOC: 'application/msword',
    TXT: 'text/plain',
    RTF: 'application/rtf',
};
exports.MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
// Status Types
exports.STATUS_TYPES = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
};
exports.SEVERITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
};
// User Roles
exports.USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};
// Job Types
exports.JOB_TYPES = {
    DOCUMENT_PROCESSING: 'document-processing',
    COMPLIANCE_ANALYSIS: 'compliance-analysis',
    NOTIFICATION: 'notification',
};
// Notification Types
exports.NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
};
// Pagination
exports.DEFAULT_PAGE_SIZE = 10;
exports.MAX_PAGE_SIZE = 100;
// Timeouts
exports.API_TIMEOUT = 30000; // 30 seconds
exports.UPLOAD_TIMEOUT = 300000; // 5 minutes
// Local Storage Keys
exports.STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PROFILE: 'user_profile',
    THEME: 'theme',
    LANGUAGE: 'language',
};
// Theme
exports.THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
};
// Languages
exports.LANGUAGES = {
    EN: 'en',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
};
// Error Messages
exports.ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Resource not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT_ERROR: 'Request timeout. Please try again.',
    FILE_TOO_LARGE: 'File is too large. Maximum size is 50MB.',
    UNSUPPORTED_FILE_TYPE: 'File type not supported.',
    UPLOAD_FAILED: 'File upload failed. Please try again.',
};
// Success Messages
exports.SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful.',
    REGISTER_SUCCESS: 'Registration successful.',
    LOGOUT_SUCCESS: 'Logout successful.',
    PROFILE_UPDATED: 'Profile updated successfully.',
    FILE_UPLOADED: 'File uploaded successfully.',
    ANALYSIS_STARTED: 'Analysis started successfully.',
    DOCUMENT_DELETED: 'Document deleted successfully.',
    PASSWORD_CHANGED: 'Password changed successfully.',
};
// Validation Rules
exports.VALIDATION_RULES = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
};
// Colors
exports.COLORS = {
    PRIMARY: '#007bff',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40',
    WHITE: '#ffffff',
    BLACK: '#000000',
};
// Breakpoints (for responsive design)
exports.BREAKPOINTS = {
    XS: 0,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1400,
};
