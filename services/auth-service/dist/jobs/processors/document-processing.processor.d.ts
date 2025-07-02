import { Job } from 'bullmq';
import { CreateDocumentJobDto } from '../dto/create-document-job.dto';
export declare class DocumentProcessingProcessor {
    private readonly logger;
    handleDocumentProcessing(job: Job<CreateDocumentJobDto>): Promise<{
        success: boolean;
        documentId: string;
        processedAt: Date;
        extractedText: boolean;
        thumbnailGenerated: boolean;
        metadataUpdated: boolean;
    }>;
    private validateDocument;
    private extractText;
    private generateThumbnail;
    private updateMetadata;
}
