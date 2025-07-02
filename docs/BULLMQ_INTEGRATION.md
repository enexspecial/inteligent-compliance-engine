# BullMQ Integration Guide

## Overview

This project uses **BullMQ** for centralized job queue management in the Auth Service (NestJS). BullMQ provides reliable, scalable background job processing with Redis as the backend.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │   File Service  │    │ Analysis Service│
│   (NestJS)      │    │   (Golang)      │    │   (Python)      │
│                 │    │                 │    │                 │
│  ┌───────────┐  │    │                 │    │                 │
│  │  BullMQ   │  │    │                 │    │                 │
│  │  Queues   │  │    │                 │    │                 │
│  └───────────┘  │    │                 │    │                 │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │        Redis              │
                    │     (Job Storage)         │
                    └───────────────────────────┘
```

## Queues

### 1. Document Processing Queue (`document-processing`)
- **Purpose**: Handle file uploads, validation, and processing
- **Processor**: `DocumentProcessingProcessor`
- **Jobs**: `process-document`

### 2. Notifications Queue (`notifications`)
- **Purpose**: Send emails, Slack messages, SMS, push notifications
- **Processor**: `NotificationProcessor`
- **Jobs**: `send-notification`

### 3. Compliance Analysis Queue (`compliance-analysis`)
- **Purpose**: AI-powered document analysis and compliance checking
- **Processor**: `ComplianceAnalysisProcessor`
- **Jobs**: `analyze-compliance`

## API Endpoints

### Job Creation
```bash
# Create document processing job
POST /api/jobs/document-processing
{
  "documentId": "uuid",
  "userId": "uuid",
  "filename": "document.pdf",
  "mimeType": "application/pdf",
  "fileSize": 1024000
}

# Create notification job
POST /api/jobs/notifications
{
  "userId": "uuid",
  "type": "email",
  "subject": "Document Processed",
  "message": "Your document has been processed"
}

# Create compliance analysis job
POST /api/jobs/compliance-analysis
{
  "documentId": "uuid",
  "userId": "uuid",
  "documentPath": "/documents/doc.pdf",
  "mimeType": "application/pdf",
  "complianceFrameworks": ["GDPR", "SOX"]
}
```

### Job Monitoring
```bash
# Get job status
GET /api/jobs/status/{queueName}/{jobId}

# Get queue statistics
GET /api/jobs/stats/{queueName}

# Get all queue statistics (Admin only)
GET /api/jobs/stats
```

### Workflow Demo
```bash
# Start complete document workflow
POST /api/auth/workflow/document-upload
Authorization: Bearer {jwt_token}
{
  "documentId": "demo-doc-123",
  "filename": "sample.pdf",
  "mimeType": "application/pdf",
  "fileSize": 1024000
}
```

## Job Configuration

### Retry Strategy
- **Document Processing**: 3 attempts, exponential backoff (2s delay)
- **Notifications**: 5 attempts, exponential backoff (1s delay)
- **Compliance Analysis**: 3 attempts, exponential backoff (5s delay)

### Job Cleanup
- **Completed Jobs**: Keep last 50-100 jobs
- **Failed Jobs**: Keep last 25-50 jobs for debugging

## Integration with Other Services

### File Service (Golang)
```go
// Call Auth Service to create jobs
func (s *FileService) UploadDocument(file *multipart.FileHeader) error {
    // Process file...
    
    // Create job via HTTP call to Auth Service
    jobData := map[string]interface{}{
        "documentId": documentID,
        "userId": userID,
        "filename": file.Filename,
        "mimeType": file.Header.Get("Content-Type"),
        "fileSize": file.Size,
    }
    
    resp, err := http.PostJSON("http://auth-service:3000/api/jobs/document-processing", jobData)
    return err
}
```

### Analysis Service (Python)
```python
# Consume jobs via HTTP polling or webhooks
import requests

def poll_for_analysis_jobs():
    response = requests.get("http://auth-service:3000/api/jobs/stats/compliance-analysis")
    if response.json()["waiting"] > 0:
        # Process jobs...
        pass
```

## Monitoring and Debugging

### Redis Commands
```bash
# Connect to Redis
redis-cli

# List all queues
KEYS bull:*

# Get queue info
LLEN bull:document-processing:wait
LLEN bull:document-processing:active
LLEN bull:document-processing:completed
LLEN bull:document-processing:failed

# Get job details
HGETALL bull:document-processing:1
```

### Logs
```bash
# View job processing logs
docker-compose logs -f auth-service | grep "DocumentProcessingProcessor"
docker-compose logs -f auth-service | grep "NotificationProcessor"
docker-compose logs -f auth-service | grep "ComplianceAnalysisProcessor"
```

## Best Practices

1. **Job Idempotency**: Ensure jobs can be safely retried
2. **Error Handling**: Log detailed error information for debugging
3. **Progress Updates**: Use `job.updateProgress()` for long-running jobs
4. **Resource Management**: Clean up completed/failed jobs regularly
5. **Monitoring**: Set up alerts for failed jobs and queue backlogs

## Scaling

### Horizontal Scaling
```bash
# Run multiple instances of Auth Service
docker-compose up --scale auth-service=3
```

### Worker Processes
```bash
# Each instance can run multiple worker processes
NODE_ENV=production node dist/main --workers=4
```

## Environment Variables

```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379

# BullMQ Configuration
BULLMQ_PREFIX=bull
BULLMQ_DEFAULT_JOB_OPTIONS={"removeOnComplete": 100, "removeOnFail": 50}
``` 