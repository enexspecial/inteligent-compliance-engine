import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { CreateDocumentJobDto } from './dto/create-document-job.dto';
import { CreateNotificationJobDto } from './dto/create-notification-job.dto';
import { CreateAnalysisJobDto } from './dto/create-analysis-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectQueue('document-processing')
    private documentProcessingQueue: Queue,
    @InjectQueue('notifications')
    private notificationsQueue: Queue,
    @InjectQueue('compliance-analysis')
    private complianceAnalysisQueue: Queue,
  ) {}

  async createDocumentProcessingJob(data: CreateDocumentJobDto) {
    return this.documentProcessingQueue.add('process-document', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: 100,
      removeOnFail: 50,
    });
  }

  async createNotificationJob(data: CreateNotificationJobDto) {
    return this.notificationsQueue.add('send-notification', data, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: 100,
      removeOnFail: 50,
    });
  }

  async createComplianceAnalysisJob(data: CreateAnalysisJobDto) {
    return this.complianceAnalysisQueue.add('analyze-compliance', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 50,
      removeOnFail: 25,
    });
  }

  async getJobStatus(queueName: string, jobId: string) {
    const queue = this.getQueueByName(queueName);
    const job = await queue.getJob(jobId);
    
    if (!job) {
      return { status: 'not_found' };
    }

    return {
      id: job.id,
      status: await job.getState(),
      progress: await job.progress(),
      data: job.data,
      failedReason: job.failedReason,
      timestamp: job.timestamp,
    };
  }

  async getQueueStats(queueName: string) {
    const queue = this.getQueueByName(queueName);
    const [waiting, active, completed, failed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
    };
  }

  private getQueueByName(queueName: string): Queue {
    switch (queueName) {
      case 'document-processing':
        return this.documentProcessingQueue;
      case 'notifications':
        return this.notificationsQueue;
      case 'compliance-analysis':
        return this.complianceAnalysisQueue;
      default:
        throw new Error(`Unknown queue: ${queueName}`);
    }
  }
} 