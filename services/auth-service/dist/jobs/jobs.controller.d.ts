import { JobsService } from './jobs.service';
import { CreateDocumentJobDto } from './dto/create-document-job.dto';
import { CreateNotificationJobDto } from './dto/create-notification-job.dto';
import { CreateAnalysisJobDto } from './dto/create-analysis-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    createDocumentProcessingJob(createJobDto: CreateDocumentJobDto): Promise<{
        success: boolean;
        jobId: string;
        message: string;
    }>;
    createNotificationJob(createJobDto: CreateNotificationJobDto): Promise<{
        success: boolean;
        jobId: string;
        message: string;
    }>;
    createComplianceAnalysisJob(createJobDto: CreateAnalysisJobDto): Promise<{
        success: boolean;
        jobId: string;
        message: string;
    }>;
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
    getAllQueueStats(): Promise<{}>;
}
