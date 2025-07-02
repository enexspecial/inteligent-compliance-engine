import { Queue } from 'bullmq';
import { CreateDocumentJobDto } from './dto/create-document-job.dto';
import { CreateNotificationJobDto } from './dto/create-notification-job.dto';
import { CreateAnalysisJobDto } from './dto/create-analysis-job.dto';
export declare class JobsService {
    private documentProcessingQueue;
    private notificationsQueue;
    private complianceAnalysisQueue;
    constructor(documentProcessingQueue: Queue, notificationsQueue: Queue, complianceAnalysisQueue: Queue);
    createDocumentProcessingJob(data: CreateDocumentJobDto): Promise<import("bullmq").Job<any, any, string>>;
    createNotificationJob(data: CreateNotificationJobDto): Promise<import("bullmq").Job<any, any, string>>;
    createComplianceAnalysisJob(data: CreateAnalysisJobDto): Promise<import("bullmq").Job<any, any, string>>;
    getJobStatus(queueName: string, jobId: string): Promise<{
        status: string;
        id?: undefined;
        progress?: undefined;
        data?: undefined;
        failedReason?: undefined;
        timestamp?: undefined;
    } | {
        id: any;
        status: any;
        progress: any;
        data: any;
        failedReason: any;
        timestamp: any;
    }>;
    getQueueStats(queueName: string): Promise<{
        waiting: number;
        active: number;
        completed: number;
        failed: number;
    }>;
    private getQueueByName;
}
