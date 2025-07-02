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
var DocumentProcessingProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentProcessingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
let DocumentProcessingProcessor = DocumentProcessingProcessor_1 = class DocumentProcessingProcessor {
    constructor() {
        this.logger = new common_1.Logger(DocumentProcessingProcessor_1.name);
    }
    async handleDocumentProcessing(job) {
        this.logger.log(`Processing document: ${job.data.documentId}`);
        try {
            await this.validateDocument(job.data);
            await this.extractText(job.data);
            await this.generateThumbnail(job.data);
            await this.updateMetadata(job.data);
            this.logger.log(`Document processing completed: ${job.data.documentId}`);
            return {
                success: true,
                documentId: job.data.documentId,
                processedAt: new Date(),
                extractedText: true,
                thumbnailGenerated: true,
                metadataUpdated: true,
            };
        }
        catch (error) {
            this.logger.error(`Document processing failed: ${job.data.documentId}`, error.stack);
            throw error;
        }
    }
    async validateDocument(data) {
        this.logger.log(`Validating document: ${data.filename}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (data.fileSize > 100 * 1024 * 1024) {
            throw new Error('File size exceeds limit');
        }
        const allowedTypes = ['application/pdf', 'text/plain', 'application/msword'];
        if (!allowedTypes.includes(data.mimeType)) {
            throw new Error('Unsupported file type');
        }
    }
    async extractText(data) {
        this.logger.log(`Extracting text from: ${data.filename}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    async generateThumbnail(data) {
        this.logger.log(`Generating thumbnail for: ${data.filename}`);
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    async updateMetadata(data) {
        this.logger.log(`Updating metadata for: ${data.filename}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
};
exports.DocumentProcessingProcessor = DocumentProcessingProcessor;
__decorate([
    (0, bull_1.Process)('process-document'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], DocumentProcessingProcessor.prototype, "handleDocumentProcessing", null);
exports.DocumentProcessingProcessor = DocumentProcessingProcessor = DocumentProcessingProcessor_1 = __decorate([
    (0, bull_1.Processor)('document-processing')
], DocumentProcessingProcessor);
//# sourceMappingURL=document-processing.processor.js.map