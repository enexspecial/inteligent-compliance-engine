export declare class CreateDocumentJobDto {
    documentId: string;
    userId: string;
    filename: string;
    mimeType: string;
    fileSize: number;
    storagePath?: string;
    priority?: number;
}
