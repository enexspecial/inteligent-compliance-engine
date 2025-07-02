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
var NotificationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const create_notification_job_dto_1 = require("../dto/create-notification-job.dto");
let NotificationProcessor = NotificationProcessor_1 = class NotificationProcessor {
    constructor() {
        this.logger = new common_1.Logger(NotificationProcessor_1.name);
    }
    async handleNotification(job) {
        this.logger.log(`Sending notification to user: ${job.data.userId}`);
        try {
            switch (job.data.type) {
                case create_notification_job_dto_1.NotificationType.EMAIL:
                    await this.sendEmail(job.data);
                    break;
                case create_notification_job_dto_1.NotificationType.SLACK:
                    await this.sendSlackMessage(job.data);
                    break;
                case create_notification_job_dto_1.NotificationType.SMS:
                    await this.sendSMS(job.data);
                    break;
                case create_notification_job_dto_1.NotificationType.PUSH:
                    await this.sendPushNotification(job.data);
                    break;
                default:
                    throw new Error(`Unsupported notification type: ${job.data.type}`);
            }
            this.logger.log(`Notification sent successfully to user: ${job.data.userId}`);
            return {
                success: true,
                userId: job.data.userId,
                type: job.data.type,
                sentAt: new Date(),
            };
        }
        catch (error) {
            this.logger.error(`Notification failed for user: ${job.data.userId}`, error.stack);
            throw error;
        }
    }
    async sendEmail(data) {
        this.logger.log(`Sending email to user: ${data.userId}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async sendSlackMessage(data) {
        this.logger.log(`Sending Slack message to user: ${data.userId}`);
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    async sendSMS(data) {
        this.logger.log(`Sending SMS to user: ${data.userId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    async sendPushNotification(data) {
        this.logger.log(`Sending push notification to user: ${data.userId}`);
        await new Promise(resolve => setTimeout(resolve, 600));
    }
};
exports.NotificationProcessor = NotificationProcessor;
__decorate([
    (0, bull_1.Process)('send-notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], NotificationProcessor.prototype, "handleNotification", null);
exports.NotificationProcessor = NotificationProcessor = NotificationProcessor_1 = __decorate([
    (0, bull_1.Processor)('notifications')
], NotificationProcessor);
//# sourceMappingURL=notification.processor.js.map