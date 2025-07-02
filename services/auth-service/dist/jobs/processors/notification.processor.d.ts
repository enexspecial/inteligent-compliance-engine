import { Job } from 'bullmq';
import { CreateNotificationJobDto, NotificationType } from '../dto/create-notification-job.dto';
export declare class NotificationProcessor {
    private readonly logger;
    handleNotification(job: Job<CreateNotificationJobDto>): Promise<{
        success: boolean;
        userId: string;
        type: NotificationType;
        sentAt: Date;
    }>;
    private sendEmail;
    private sendSlackMessage;
    private sendSMS;
    private sendPushNotification;
}
