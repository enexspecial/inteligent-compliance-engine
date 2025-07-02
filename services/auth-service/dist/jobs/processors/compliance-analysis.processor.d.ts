import { Job } from 'bullmq';
import { CreateAnalysisJobDto } from '../dto/create-analysis-job.dto';
export declare class ComplianceAnalysisProcessor {
    private readonly logger;
    handleComplianceAnalysis(job: Job<CreateAnalysisJobDto>): Promise<{
        success: boolean;
        documentId: string;
        analysisResult: any;
        report: any;
        analyzedAt: Date;
    }>;
    private extractDocumentContent;
    private analyzeCompliance;
    private generateReport;
    private storeResults;
}
