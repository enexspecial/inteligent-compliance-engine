import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateDocumentJobDto } from './dto/create-document-job.dto';
import { CreateNotificationJobDto } from './dto/create-notification-job.dto';
import { CreateAnalysisJobDto } from './dto/create-analysis-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@compliance-engine/shared-types';

@ApiTags('jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('document-processing')
  @ApiOperation({ summary: 'Create a document processing job' })
  async createDocumentProcessingJob(@Body() createJobDto: CreateDocumentJobDto) {
    const job = await this.jobsService.createDocumentProcessingJob(createJobDto);
    return {
      success: true,
      jobId: job.id,
      message: 'Document processing job created successfully',
    };
  }

  @Post('notifications')
  @ApiOperation({ summary: 'Create a notification job' })
  async createNotificationJob(@Body() createJobDto: CreateNotificationJobDto) {
    const job = await this.jobsService.createNotificationJob(createJobDto);
    return {
      success: true,
      jobId: job.id,
      message: 'Notification job created successfully',
    };
  }

  @Post('compliance-analysis')
  @ApiOperation({ summary: 'Create a compliance analysis job' })
  async createComplianceAnalysisJob(@Body() createJobDto: CreateAnalysisJobDto) {
    const job = await this.jobsService.createComplianceAnalysisJob(createJobDto);
    return {
      success: true,
      jobId: job.id,
      message: 'Compliance analysis job created successfully',
    };
  }

  @Get('status/:queueName/:jobId')
  @ApiOperation({ summary: 'Get job status' })
  async getJobStatus(
    @Param('queueName') queueName: string,
    @Param('jobId') jobId: string,
  ) {
    return this.jobsService.getJobStatus(queueName, jobId);
  }

  @Get('stats/:queueName')
  @ApiOperation({ summary: 'Get queue statistics' })
  async getQueueStats(@Param('queueName') queueName: string) {
    return this.jobsService.getQueueStats(queueName);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all queue statistics (Admin only)' })
  async getAllQueueStats() {
    const queues = ['document-processing', 'notifications', 'compliance-analysis'];
    const stats = {};
    
    for (const queueName of queues) {
      stats[queueName] = await this.jobsService.getQueueStats(queueName);
    }
    
    return stats;
  }
} 