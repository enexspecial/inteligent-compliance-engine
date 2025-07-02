import { IsString, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum NotificationType {
  EMAIL = 'email',
  SLACK = 'slack',
  SMS = 'sms',
  PUSH = 'push',
}

export class CreateNotificationJobDto {
  @ApiProperty({ description: 'User ID to notify' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Notification type', enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ description: 'Notification subject/title' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Notification message' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'Related document ID', required: false })
  @IsUUID()
  @IsOptional()
  documentId?: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  metadata?: Record<string, any>;
} 