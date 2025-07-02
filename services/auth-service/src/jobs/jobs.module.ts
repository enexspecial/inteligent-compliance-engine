import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { DocumentProcessingProcessor } from './processors/document-processing.processor';
import { NotificationProcessor } from './processors/notification.processor';
import { ComplianceAnalysisProcessor } from './processors/compliance-analysis.processor';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'document-processing',
      },
      {
        name: 'notifications',
      },
      {
        name: 'compliance-analysis',
      },
    ),
  ],
  controllers: [JobsController],
  providers: [
    JobsService,
    DocumentProcessingProcessor,
    NotificationProcessor,
    ComplianceAnalysisProcessor,
  ],
  exports: [JobsService],
})
export class JobsModule {} 