import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentJobDto {
  @ApiProperty({ description: 'Document ID' })
  @IsUUID()
  documentId: string;

  @ApiProperty({ description: 'User ID who uploaded the document' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Original filename' })
  @IsString()
  filename: string;

  @ApiProperty({ description: 'File MIME type' })
  @IsString()
  mimeType: string;

  @ApiProperty({ description: 'File size in bytes' })
  fileSize: number;

  @ApiProperty({ description: 'Storage path in MinIO', required: false })
  @IsString()
  @IsOptional()
  storagePath?: string;

  @ApiProperty({ description: 'Processing priority', required: false })
  @IsOptional()
  priority?: number;
} 