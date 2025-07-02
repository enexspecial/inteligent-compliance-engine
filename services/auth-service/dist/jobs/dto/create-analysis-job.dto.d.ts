export declare class CreateAnalysisJobDto {
    documentId: string;
    userId: string;
    documentPath: string;
    mimeType: string;
    complianceFrameworks?: string[];
    priority?: number;
    parameters?: Record<string, any>;
}
