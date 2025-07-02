"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const jobs_service_1 = require("./jobs.service");
const jobs_controller_1 = require("./jobs.controller");
const document_processing_processor_1 = require("./processors/document-processing.processor");
const notification_processor_1 = require("./processors/notification.processor");
const compliance_analysis_processor_1 = require("./processors/compliance-analysis.processor");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'document-processing',
            }, {
                name: 'notifications',
            }, {
                name: 'compliance-analysis',
            }),
        ],
        controllers: [jobs_controller_1.JobsController],
        providers: [
            jobs_service_1.JobsService,
            document_processing_processor_1.DocumentProcessingProcessor,
            notification_processor_1.NotificationProcessor,
            compliance_analysis_processor_1.ComplianceAnalysisProcessor,
        ],
        exports: [jobs_service_1.JobsService],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map