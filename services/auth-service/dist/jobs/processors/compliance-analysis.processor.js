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
var ComplianceAnalysisProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceAnalysisProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
let ComplianceAnalysisProcessor = ComplianceAnalysisProcessor_1 = class ComplianceAnalysisProcessor {
    constructor() {
        this.logger = new common_1.Logger(ComplianceAnalysisProcessor_1.name);
    }
    async handleComplianceAnalysis(job) {
        this.logger.log(`Starting compliance analysis for document: ${job.data.documentId}`);
        try {
            await job.updateProgress(10);
            const content = await this.extractDocumentContent(job.data);
            await job.updateProgress(30);
            const analysisResult = await this.analyzeCompliance(content, job.data);
            await job.updateProgress(70);
            const report = await this.generateReport(analysisResult, job.data);
            await job.updateProgress(90);
            await this.storeResults(job.data.documentId, analysisResult, report);
            await job.updateProgress(100);
            this.logger.log(`Compliance analysis completed for document: ${job.data.documentId}`);
            return {
                success: true,
                documentId: job.data.documentId,
                analysisResult,
                report,
                analyzedAt: new Date(),
            };
        }
        catch (error) {
            this.logger.error(`Compliance analysis failed for document: ${job.data.documentId}`, error.stack);
            throw error;
        }
    }
    async extractDocumentContent(data) {
        this.logger.log(`Extracting content from document: ${data.documentId}`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        return `Sample document content for analysis. This would contain the actual text extracted from the document at ${data.documentPath}.`;
    }
    async analyzeCompliance(content, data) {
        this.logger.log(`Analyzing compliance for document: ${data.documentId}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        return {
            complianceScore: 85,
            issues: [
                {
                    severity: 'medium',
                    category: 'data_privacy',
                    description: 'Document contains personal information that may need additional protection',
                    lineNumber: 15,
                },
                {
                    severity: 'low',
                    category: 'formatting',
                    description: 'Document formatting could be improved for better readability',
                    lineNumber: 8,
                },
            ],
            recommendations: [
                'Implement additional data encryption for personal information',
                'Consider redacting sensitive data before analysis',
                'Update document template to improve compliance',
            ],
            frameworks: data.complianceFrameworks || ['GDPR', 'SOX', 'HIPAA'],
        };
    }
    async generateReport(analysisResult, data) {
        this.logger.log(`Generating report for document: ${data.documentId}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            reportId: `report_${data.documentId}_${Date.now()}`,
            summary: `Compliance analysis completed with score: ${analysisResult.complianceScore}/100`,
            details: analysisResult,
            generatedAt: new Date(),
            format: 'pdf',
        };
    }
    async storeResults(documentId, analysisResult, report) {
        this.logger.log(`Storing analysis results for document: ${documentId}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};
exports.ComplianceAnalysisProcessor = ComplianceAnalysisProcessor;
__decorate([
    (0, bull_1.Process)('analyze-compliance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], ComplianceAnalysisProcessor.prototype, "handleComplianceAnalysis", null);
exports.ComplianceAnalysisProcessor = ComplianceAnalysisProcessor = ComplianceAnalysisProcessor_1 = __decorate([
    (0, bull_1.Processor)('compliance-analysis')
], ComplianceAnalysisProcessor);
//# sourceMappingURL=compliance-analysis.processor.js.map