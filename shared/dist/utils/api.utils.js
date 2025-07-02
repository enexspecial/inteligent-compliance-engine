"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisApiClient = exports.fileApiClient = exports.authApiClient = exports.ApiClient = exports.ANALYSIS_SERVICE_URL = exports.FILE_SERVICE_URL = exports.API_BASE_URL = void 0;
exports.API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
exports.FILE_SERVICE_URL = process.env.REACT_APP_FILE_SERVICE_URL || 'http://localhost:8080';
exports.ANALYSIS_SERVICE_URL = process.env.REACT_APP_ANALYSIS_SERVICE_URL || 'http://localhost:8000';
class ApiClient {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.timeout = config.timeout || 10000;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...config.headers,
        };
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            ...this.defaultHeaders,
            ...options.headers,
        };
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }
    async get(endpoint, token) {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return this.request(endpoint, {
            method: 'GET',
            headers,
        });
    }
    async post(endpoint, data, token) {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return this.request(endpoint, {
            method: 'POST',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });
    }
    async put(endpoint, data, token) {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return this.request(endpoint, {
            method: 'PUT',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });
    }
    async delete(endpoint, token) {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return this.request(endpoint, {
            method: 'DELETE',
            headers,
        });
    }
    async upload(endpoint, file, onProgress, token) {
        const formData = new FormData();
        formData.append('file', file);
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        // Remove Content-Type header to let browser set it with boundary
        delete headers['Content-Type'];
        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const progress = (event.loaded / event.total) * 100;
                    onProgress(progress);
                }
            });
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                    catch {
                        resolve(xhr.responseText);
                    }
                }
                else {
                    reject(new Error(`Upload failed: ${xhr.status}`));
                }
            });
            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });
            xhr.open('POST', `${this.baseURL}${endpoint}`);
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }
            xhr.send(formData);
        });
    }
}
exports.ApiClient = ApiClient;
// Create default API clients
exports.authApiClient = new ApiClient({ baseURL: exports.API_BASE_URL });
exports.fileApiClient = new ApiClient({ baseURL: exports.FILE_SERVICE_URL });
exports.analysisApiClient = new ApiClient({ baseURL: exports.ANALYSIS_SERVICE_URL });
