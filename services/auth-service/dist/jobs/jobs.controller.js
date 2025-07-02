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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jobs_service_1 = require("./jobs.service");
const create_document_job_dto_1 = require("./dto/create-document-job.dto");
const create_notification_job_dto_1 = require("./dto/create-notification-job.dto");
const create_analysis_job_dto_1 = require("./dto/create-analysis-job.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const shared_types_1 = require("@compliance-engine/shared-types");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async createDocumentProcessingJob(createJobDto) {
        const job = await this.jobsService.createDocumentProcessingJob(createJobDto);
        return {
            success: true,
            jobId: job.id,
            message: 'Document processing job created successfully',
        };
    }
    async createNotificationJob(createJobDto) {
        const job = await this.jobsService.createNotificationJob(createJobDto);
        return {
            success: true,
            jobId: job.id,
            message: 'Notification job created successfully',
        };
    }
    async createComplianceAnalysisJob(createJobDto) {
        const job = await this.jobsService.createComplianceAnalysisJob(createJobDto);
        return {
            success: true,
            jobId: job.id,
            message: 'Compliance analysis job created successfully',
        };
    }
    async getJobStatus(queueName, jobId) {
        return this.jobsService.getJobStatus(queueName, jobId);
    }
    async getQueueStats(queueName) {
        return this.jobsService.getQueueStats(queueName);
    }
    async getAllQueueStats() {
        const queues = ['document-processing', 'notifications', 'compliance-analysis'];
        const stats = {};
        for (const queueName of queues) {
            stats[queueName] = await this.jobsService.getQueueStats(queueName);
        }
        return stats;
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('document-processing'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a document processing job' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_job_dto_1.CreateDocumentJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createDocumentProcessingJob", null);
__decorate([
    (0, common_1.Post)('notifications'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a notification job' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_job_dto_1.CreateNotificationJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createNotificationJob", null);
__decorate([
    (0, common_1.Post)('compliance-analysis'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a compliance analysis job' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_analysis_job_dto_1.CreateAnalysisJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createComplianceAnalysisJob", null);
__decorate([
    (0, common_1.Get)('status/:queueName/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get job status' }),
    __param(0, (0, common_1.Param)('queueName')),
    __param(1, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobStatus", null);
__decorate([
    (0, common_1.Get)('stats/:queueName'),
    (0, swagger_1.ApiOperation)({ summary: 'Get queue statistics' }),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getQueueStats", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)(shared_types_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all queue statistics (Admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getAllQueueStats", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, common_1.Controller)('jobs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map