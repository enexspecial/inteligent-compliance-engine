export declare const API_BASE_URL: string;
export declare const FILE_SERVICE_URL: string;
export declare const ANALYSIS_SERVICE_URL: string;
export interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
}
export declare class ApiClient {
    private baseURL;
    private timeout;
    private defaultHeaders;
    constructor(config: ApiClientConfig);
    private request;
    get<T>(endpoint: string, token?: string): Promise<T>;
    post<T>(endpoint: string, data?: any, token?: string): Promise<T>;
    put<T>(endpoint: string, data?: any, token?: string): Promise<T>;
    delete<T>(endpoint: string, token?: string): Promise<T>;
    upload<T>(endpoint: string, file: File, onProgress?: (progress: number) => void, token?: string): Promise<T>;
}
export declare const authApiClient: ApiClient;
export declare const fileApiClient: ApiClient;
export declare const analysisApiClient: ApiClient;
