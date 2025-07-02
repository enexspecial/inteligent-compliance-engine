"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const bullmq_1 = require("bullmq");
let JobsService = class JobsService {
    constructor(documentProcessingQueue, notificationsQueue, complianceAnalysisQueue) {
        this.documentProcessingQueue = documentProcessingQueue;
        this.notificationsQueue = notificationsQueue;
        this.complianceAnalysisQueue = complianceAnalysisQueue;
    }
    async createDocumentProcessingJob(data) {
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
    async createNotificationJob(data) {
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
    async createComplianceAnalysisJob(data) {
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
    async getJobStatus(queueName, jobId) {
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
    async getQueueStats(queueName) {
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
    getQueueByName(queueName) {
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
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('document-processing')),
    __param(1, (0, bull_1.InjectQueue)('notifications')),
    __param(2, (0, bull_1.InjectQueue)('compliance-analysis')),
    __metadata("design:paramtypes", [bullmq_1.Queue,
        bullmq_1.Queue,
        bullmq_1.Queue])
], JobsService);
//# sourceMappingURL=jobs.service.js.map