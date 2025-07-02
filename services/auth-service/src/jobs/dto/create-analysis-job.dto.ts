import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnalysisJobDto {
  @ApiProperty({ description: 'Document ID to analyze' })
  @IsUUID()
  documentId: string;

  @ApiProperty({ description: 'User ID who requested analysis' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Document storage path' })
  @IsString()
  documentPath: string;

  @ApiProperty({ description: 'Document MIME type' })
  @IsString()
  mimeType: string;

  @ApiProperty({ description: 'Compliance frameworks to check', required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  complianceFrameworks?: string[];

  @ApiProperty({ description: 'Analysis priority', required: false })
  @IsOptional()
  priority?: number;

  @ApiProperty({ description: 'Additional analysis parameters', required: false })
  @IsOptional()
  parameters?: Record<string, any>;
} 