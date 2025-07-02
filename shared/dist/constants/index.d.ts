export declare const API_ENDPOINTS: {
    readonly AUTH: {
        readonly LOGIN: "/auth/login";
        readonly REGISTER: "/auth/register";
        readonly LOGOUT: "/auth/logout";
        readonly REFRESH: "/auth/refresh";
        readonly PROFILE: "/auth/profile";
    };
    readonly USERS: {
        readonly BASE: "/users";
        readonly PROFILE: "/users/profile";
        readonly UPDATE: "/users/profile";
    };
    readonly DOCUMENTS: {
        readonly BASE: "/documents";
        readonly UPLOAD: "/documents/upload";
        readonly DOWNLOAD: "/documents/download";
        readonly DELETE: "/documents/delete";
    };
    readonly ANALYSIS: {
        readonly BASE: "/analysis";
        readonly START: "/analysis/start";
        readonly STATUS: "/analysis/status";
        readonly RESULTS: "/analysis/results";
    };
    readonly JOBS: {
        readonly BASE: "/jobs";
        readonly STATUS: "/jobs/status";
        readonly CANCEL: "/jobs/cancel";
    };
    readonly NOTIFICATIONS: {
        readonly BASE: "/notifications";
        readonly MARK_READ: "/notifications/mark-read";
        readonly MARK_ALL_READ: "/notifications/mark-all-read";
    };
};
export declare const SUPPORTED_FILE_TYPES: {
    readonly PDF: "application/pdf";
    readonly DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    readonly DOC: "application/msword";
    readonly TXT: "text/plain";
    readonly RTF: "application/rtf";
};
export declare const MAX_FILE_SIZE: number;
export declare const STATUS_TYPES: {
    readonly PENDING: "pending";
    readonly PROCESSING: "processing";
    readonly COMPLETED: "completed";
    readonly FAILED: "failed";
};
export declare const SEVERITY_LEVELS: {
    readonly LOW: "low";
    readonly MEDIUM: "medium";
    readonly HIGH: "high";
    readonly CRITICAL: "critical";
};
export declare const USER_ROLES: {
    readonly ADMIN: "admin";
    readonly USER: "user";
};
export declare const JOB_TYPES: {
    readonly DOCUMENT_PROCESSING: "document-processing";
    readonly COMPLIANCE_ANALYSIS: "compliance-analysis";
    readonly NOTIFICATION: "notification";
};
export declare const NOTIFICATION_TYPES: {
    readonly INFO: "info";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly ERROR: "error";
};
export declare const DEFAULT_PAGE_SIZE = 10;
export declare const MAX_PAGE_SIZE = 100;
export declare const API_TIMEOUT = 30000;
export declare const UPLOAD_TIMEOUT = 300000;
export declare const STORAGE_KEYS: {
    readonly AUTH_TOKEN: "auth_token";
    readonly REFRESH_TOKEN: "refresh_token";
    readonly USER_PROFILE: "user_profile";
    readonly THEME: "theme";
    readonly LANGUAGE: "language";
};
export declare const THEMES: {
    readonly LIGHT: "light";
    readonly DARK: "dark";
    readonly SYSTEM: "system";
};
export declare const LANGUAGES: {
    readonly EN: "en";
    readonly ES: "es";
    readonly FR: "fr";
    readonly DE: "de";
};
export declare const ERROR_MESSAGES: {
    readonly NETWORK_ERROR: "Network error. Please check your connection.";
    readonly UNAUTHORIZED: "You are not authorized to perform this action.";
    readonly FORBIDDEN: "Access denied.";
    readonly NOT_FOUND: "Resource not found.";
    readonly VALIDATION_ERROR: "Please check your input and try again.";
    readonly SERVER_ERROR: "Server error. Please try again later.";
    readonly TIMEOUT_ERROR: "Request timeout. Please try again.";
    readonly FILE_TOO_LARGE: "File is too large. Maximum size is 50MB.";
    readonly UNSUPPORTED_FILE_TYPE: "File type not supported.";
    readonly UPLOAD_FAILED: "File upload failed. Please try again.";
};
export declare const SUCCESS_MESSAGES: {
    readonly LOGIN_SUCCESS: "Login successful.";
    readonly REGISTER_SUCCESS: "Registration successful.";
    readonly LOGOUT_SUCCESS: "Logout successful.";
    readonly PROFILE_UPDATED: "Profile updated successfully.";
    readonly FILE_UPLOADED: "File uploaded successfully.";
    readonly ANALYSIS_STARTED: "Analysis started successfully.";
    readonly DOCUMENT_DELETED: "Document deleted successfully.";
    readonly PASSWORD_CHANGED: "Password changed successfully.";
};
export declare const VALIDATION_RULES: {
    readonly EMAIL: RegExp;
    readonly PASSWORD_MIN_LENGTH: 8;
    readonly PASSWORD_REGEX: RegExp;
    readonly NAME_MIN_LENGTH: 2;
    readonly NAME_MAX_LENGTH: 50;
};
export declare const COLORS: {
    readonly PRIMARY: "#007bff";
    readonly SECONDARY: "#6c757d";
    readonly SUCCESS: "#28a745";
    readonly DANGER: "#dc3545";
    readonly WARNING: "#ffc107";
    readonly INFO: "#17a2b8";
    readonly LIGHT: "#f8f9fa";
    readonly DARK: "#343a40";
    readonly WHITE: "#ffffff";
    readonly BLACK: "#000000";
};
export declare const BREAKPOINTS: {
    readonly XS: 0;
    readonly SM: 576;
    readonly MD: 768;
    readonly LG: 992;
    readonly XL: 1200;
    readonly XXL: 1400;
};
