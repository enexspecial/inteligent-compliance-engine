# System Architecture

## Overview

The Intelligent Compliance Engine is a microservices-based system designed to process and analyze compliance documents using AI-powered analysis.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Mobile App    │    │   API Gateway   │
│   (React/Vue)   │    │   (React Native)│    │   (Optional)    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │                           │
            ┌───────▼────────┐        ┌────────▼───────┐
            │  Auth Service  │        │  File Service  │
            │   (NestJS)     │        │   (Golang)     │
            └───────┬────────┘        └────────┬───────┘
                    │                          │
                    └──────────┬───────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Analysis Service   │
                    │    (Python)         │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Infrastructure    │
                    │                     │
            ┌───────┴─────────┴───────────┴───────┐
            │                                     │
    ┌───────▼──────┐    ┌─────────┐    ┌─────────▼──────┐
    │  PostgreSQL  │    │  Redis  │    │     MinIO      │
    │   Database   │    │  Cache  │    │  File Storage  │
    └──────────────┘    └─────────┘    └────────────────┘
```

## Service Responsibilities

### Auth Service (NestJS)
- **Authentication**: JWT-based user authentication
- **Authorization**: Role-based access control (RBAC)
- **User Management**: CRUD operations for users
- **Session Management**: Redis-based session storage

### File Service (Golang)
- **File Upload**: Handle document uploads with validation
- **File Processing**: Convert and process various document formats
- **Storage Management**: Interface with MinIO for file storage
- **Metadata Management**: Track file metadata and processing status

### Analysis Service (Python)
- **Document Analysis**: Use LangChain for AI-powered analysis
- **Compliance Checking**: Apply compliance rules and regulations
- **Report Generation**: Generate detailed compliance reports
- **AI Integration**: Connect with OpenAI and other AI services

## Data Flow

1. **Authentication**: User authenticates via Auth Service
2. **File Upload**: User uploads document via File Service
3. **Processing**: File Service processes and stores the document
4. **Analysis**: Analysis Service retrieves and analyzes the document
5. **Results**: Analysis results are stored and returned to user

## Technology Stack

### Backend Services
- **Auth Service**: NestJS, TypeScript, PostgreSQL, Redis
- **File Service**: Golang, Gin, PostgreSQL, MinIO
- **Analysis Service**: Python, FastAPI, LangChain, OpenAI

### Infrastructure
- **Database**: PostgreSQL
- **Cache**: Redis
- **File Storage**: MinIO (S3-compatible)
- **Containerization**: Docker & Docker Compose
- **API Documentation**: Swagger/OpenAPI

### Development Tools
- **Package Managers**: npm (Node.js), go mod (Golang), pip (Python)
- **Testing**: Jest (NestJS), Go testing, pytest (Python)
- **Linting**: ESLint, golint, flake8

## Security Considerations

- **Authentication**: JWT tokens with proper expiration
- **Authorization**: Role-based access control
- **Data Encryption**: Encrypted storage for sensitive data
- **API Security**: Input validation and sanitization
- **File Security**: Secure file upload and storage

## Scalability

- **Horizontal Scaling**: Each service can be scaled independently
- **Load Balancing**: Can be added via API Gateway
- **Database Scaling**: Read replicas and connection pooling
- **Caching**: Redis for session and data caching
- **File Storage**: MinIO supports distributed storage 