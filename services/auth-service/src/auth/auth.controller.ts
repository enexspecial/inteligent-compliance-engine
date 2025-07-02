import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JobsService } from '../jobs/jobs.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotificationType } from '@compliance-engine/shared-types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jobsService: JobsService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('workflow/document-upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start document upload workflow (demo)' })
  async startDocumentWorkflow(@Request() req, @Body() documentData: any) {
    const userId = req.user.id;
    
    // Step 1: Create document processing job
    const processingJob = await this.jobsService.createDocumentProcessingJob({
      documentId: documentData.documentId || 'demo-doc-123',
      userId,
      filename: documentData.filename || 'sample.pdf',
      mimeType: documentData.mimeType || 'application/pdf',
      fileSize: documentData.fileSize || 1024000,
      storagePath: documentData.storagePath || '/documents/sample.pdf',
    });

    // Step 2: Create compliance analysis job (delayed)
    const analysisJob = await this.jobsService.createComplianceAnalysisJob({
      documentId: documentData.documentId || 'demo-doc-123',
      userId,
      documentPath: documentData.storagePath || '/documents/sample.pdf',
      mimeType: documentData.mimeType || 'application/pdf',
      complianceFrameworks: documentData.frameworks || ['GDPR', 'SOX'],
    });

    // Step 3: Create notification job
    const notificationJob = await this.jobsService.createNotificationJob({
      userId,
      type: NotificationType.EMAIL,
      subject: 'Document Upload Confirmation',
      message: `Your document "${documentData.filename || 'sample.pdf'}" has been uploaded and is being processed.`,
      documentId: documentData.documentId || 'demo-doc-123',
    });

    return {
      success: true,
      message: 'Document workflow started successfully',
      jobs: {
        processing: processingJob.id,
        analysis: analysisJob.id,
        notification: notificationJob.id,
      },
      userId,
    };
  }
} 