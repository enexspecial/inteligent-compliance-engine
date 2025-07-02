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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const jobs_service_1 = require("../jobs/jobs.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const shared_types_1 = require("@compliance-engine/shared-types");
let AuthController = class AuthController {
    constructor(authService, jobsService) {
        this.authService = authService;
        this.jobsService = jobsService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    getProfile(req) {
        return req.user;
    }
    async startDocumentWorkflow(req, documentData) {
        const userId = req.user.id;
        const processingJob = await this.jobsService.createDocumentProcessingJob({
            documentId: documentData.documentId || 'demo-doc-123',
            userId,
            filename: documentData.filename || 'sample.pdf',
            mimeType: documentData.mimeType || 'application/pdf',
            fileSize: documentData.fileSize || 1024000,
            storagePath: documentData.storagePath || '/documents/sample.pdf',
        });
        const analysisJob = await this.jobsService.createComplianceAnalysisJob({
            documentId: documentData.documentId || 'demo-doc-123',
            userId,
            documentPath: documentData.storagePath || '/documents/sample.pdf',
            mimeType: documentData.mimeType || 'application/pdf',
            complianceFrameworks: documentData.frameworks || ['GDPR', 'SOX'],
        });
        const notificationJob = await this.jobsService.createNotificationJob({
            userId,
            type: shared_types_1.NotificationType.EMAIL,
            subject: 'Document Upload Confirmation',
            message: `Your document "${documentData.filename || 'sample.pdf'}" has been uploaded and is being processed.`,
            documentId: documentData.documentId || 'demo-doc-123',
        });
        return {
            success: true,
            message: 'Document workflow started successfully',
            jobs: {
                processing: processingJob.id,
                analysis: analysisJob.id,
                notification: notificationJob.id,
            },
            userId,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('workflow/document-upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Start document upload workflow (demo)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "startDocumentWorkflow", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jobs_service_1.JobsService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map