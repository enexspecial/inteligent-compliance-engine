export declare enum NotificationType {
    EMAIL = "email",
    SLACK = "slack",
    SMS = "sms",
    PUSH = "push"
}
export declare class CreateNotificationJobDto {
    userId: string;
    type: NotificationType;
    subject: string;
    message: string;
    documentId?: string;
    metadata?: Record<string, any>;
}
