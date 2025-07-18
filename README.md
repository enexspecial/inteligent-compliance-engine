# Intelligent Compliance Engine

A comprehensive fullstack compliance document processing and analysis system built with NestJS, Python, Golang, and React Native.

## Architecture

This monorepo contains multiple applications:

### Backend Services (Microservices)
- **API Gateway (NestJS)**: Single entry point for all client applications with centralized authentication
- **Auth Service (NestJS)**: Handles authentication, user management, and authorization
- **File Processing Service (Golang)**: Manages document upload, processing, and storage
- **Document Analysis Service (Python)**: Performs document analysis using LangChain and AI

### Frontend Application
- **Mobile Application (React Native + Expo)**: Cross-platform mobile app for on-the-go access

## Project Structure

```
inteligent-compliance-engine/
├── services/               # Backend microservices
│   ├── api-gateway/        # NestJS API Gateway
│   ├── auth-service/       # NestJS authentication service
│   ├── file-service/       # Golang file processing service
│   └── analysis-service/   # Python document analysis service
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── components/     # React Native components
│   │   ├── screens/        # Screen components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── assets/             # Mobile assets
│   └── package.json
├── shared/                 # Shared utilities and types
│   ├── types/             # Shared TypeScript types
│   ├── utils/             # Shared utility functions
│   └── constants/         # Shared constants
├── infrastructure/         # Deployment configurations
├── docs/                   # Documentation
├── scripts/                # Build and deployment scripts
├── docker-compose.yml      # Development environment
└── README.md
```

> **Note:** The web application has been removed from this repository. The mobile app is now the primary frontend.

## Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd inteligent-compliance-engine

# Run the automated setup script
chmod +x scripts/setup-dev.sh
./scripts/setup-dev.sh
```

### Option 2: Manual Setup

1. **Prerequisites**
   - Node.js 18+
   - Python 3.9+
   - Go 1.21+
   - Docker & Docker Compose
   - PostgreSQL
   - Redis

2. **Setup Shared Types**
   ```bash
   # Build shared types package
   cd shared
   npm install
   npm run build
   ```

3. **Setup Backend Services**
   ```bash
   # API Gateway
   cd services/api-gateway
   npm install
   npm run build
   
   # Auth Service
   cd ../auth-service
   npm install
   npm run build
   
   # File Service
   cd ../file-service
   go mod tidy
   
   # Analysis Service
   cd ../analysis-service
   pip3 install -r requirements.txt
   ```

4. **Setup Mobile Application**
   ```bash
   cd mobile
   npm install
   ```

5. **Environment Configuration**
   ```bash
   # Create .env file for auth service
   cd services/auth-service
   cp .env.example .env
   # Edit .env with your database credentials
   ```

6. **Start Services**
   ```bash
   # Start all backend services with Docker Compose
   docker-compose up -d
   
   # Start mobile application (in new terminal)
   cd mobile
   npm start
   ```

## Development URLs

- **API Gateway**: http://localhost:4000/api
- **Auth Service**: http://localhost:3000/api
- **File Service**: http://localhost:8080
- **Analysis Service**: http://localhost:8000
- **Expo Dev Tools**: http://localhost:19002

## Deployment

### Railway Deployment (Backend Services)

Railway is a great platform for deploying the backend services. See the complete deployment guide:

📖 **[Railway Deployment Guide](docs/RAILWAY_DEPLOYMENT.md)**

**Quick Railway Setup:**
1. Connect your GitHub repository to Railway
2. Add PostgreSQL and Redis plugins
3. Set environment variables
4. Deploy!

### Mobile App Deployment

- **Mobile App**: Use Expo's build service for iOS/Android

## Features

### Mobile Application
- **Cross-platform**: Works on iOS and Android
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Real-time updates for analysis completion
- **Camera Integration**: Document scanning and upload
- **Authentication**: Secure login/logout with JWT tokens
- **Document Management**: Upload, view, and manage compliance documents
- **Analysis Dashboard**: View compliance analysis results and reports
- **User Management**: Profile management and settings

### Backend Services
- **API Gateway**: Single entry point with centralized authentication and routing
- **Microservices Architecture**: Scalable and maintainable
- **AI-Powered Analysis**: LangChain integration for compliance checking
- **File Processing**: Support for multiple document formats
- **Job Queue**: BullMQ for background processing

## Technology Stack

### Backend
- **API Gateway**: NestJS, TypeScript, JWT, Axios
- **Auth Service**: NestJS, TypeScript, PostgreSQL, Redis, JWT
- **File Service**: Golang, Gin, PostgreSQL, MinIO
- **Analysis Service**: Python, FastAPI, LangChain, OpenAI

### Frontend
- **Mobile**: React Native, Expo, TypeScript

### Infrastructure
- **Database**: PostgreSQL
- **Cache**: Redis
- **File Storage**: MinIO (S3-compatible)
- **Containerization**: Docker & Docker Compose
- **API Documentation**: Swagger/OpenAPI

## Development Workflow

### Shared Code Development

When modifying shared types or utilities:

1. Edit files in `shared/`
2. Build the package: `cd shared && npm run build`
3. Restart applications that use the shared code

### Service Development

1. **API Gateway**: `cd services/api-gateway && npm run start:dev`
2. **Auth Service**: `cd services/auth-service && npm run start:dev`
3. **File Service**: `cd services/file-service && go run main.go`
4. **Analysis Service**: `cd services/analysis-service && python main.py`
5. **Mobile App**: `cd mobile && npm start`

## Environment Variables

### Backend Services (.env)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/compliance_engine
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Mobile Application (.env)
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_FILE_SERVICE_URL=http://localhost:8080
EXPO_PUBLIC_ANALYSIS_SERVICE_URL=http://localhost:8000
```

## Troubleshooting

### Common Issues

1. **TypeScript Import Errors**: Make sure shared types are built (`cd shared && npm run build`)
2. **Database Connection**: Verify PostgreSQL is running and credentials are correct
3. **Redis Connection**: Ensure Redis is running for BullMQ
4. **Port Conflicts**: Check if ports 3000, 8080, 8000, 19002 are available
5. **Mobile Development**: Install Expo CLI and Expo Go app for testing

### Development Tips

- Use the setup script for initial configuration
- Always build shared types after changes
- Check service logs for detailed error messages
- Use Docker Compose for consistent development environment
- Test the mobile application regularly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License. 