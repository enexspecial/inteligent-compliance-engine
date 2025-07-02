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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnalysisJobDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAnalysisJobDto {
}
exports.CreateAnalysisJobDto = CreateAnalysisJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document ID to analyze' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAnalysisJobDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who requested analysis' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAnalysisJobDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document storage path' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnalysisJobDto.prototype, "documentPath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document MIME type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnalysisJobDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Compliance frameworks to check', required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAnalysisJobDto.prototype, "complianceFrameworks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Analysis priority', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAnalysisJobDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional analysis parameters', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAnalysisJobDto.prototype, "parameters", void 0);
//# sourceMappingURL=create-analysis-job.dto.js.map