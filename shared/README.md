# Shared Types Package

This package contains shared TypeScript types and interfaces used across the compliance engine services.

## Setup

### 1. Build the Shared Types Package

First, build the shared types package:

```bash
cd shared
npm install
npm run build
```

This will create the `dist/` directory with compiled JavaScript and TypeScript declaration files.

### 2. Install in Services

Add this package as a local dependency in your service's `package.json`:

```json
{
  "dependencies": {
    "@compliance-engine/shared-types": "file:../../shared"
  }
}
```

Then install dependencies:

```bash
cd services/auth-service
npm install
```

### 3. TypeScript Configuration

Add path mapping to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@compliance-engine/shared-types": ["../../shared/dist/index.js"],
      "@compliance-engine/shared-types/*": ["../../shared/dist/*"]
    }
  }
}
```

### 4. Import Types

Import types using the package name:

```typescript
import { UserRole, NotificationType, Document } from '@compliance-engine/shared-types';
```

## Environment Variables

The auth service requires the following environment variables:

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/compliance_engine

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Redis (for BullMQ)
REDIS_URL=redis://localhost:6379

# Server
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Development Workflow

1. **Build shared types**: `cd shared && npm run build`
2. **Start auth service**: `cd services/auth-service && npm run start:dev`
3. **Access API**: `http://localhost:3000/api`
4. **Swagger docs**: `http://localhost:3000/api/docs`

## Available Types

- **User**: User entity with role and metadata
- **UserRole**: Enum for user roles (ADMIN, USER, ANALYST)
- **NotificationType**: Enum for notification types (EMAIL, SMS, PUSH)
- **Document**: Document entity with processing status
- **DocumentStatus**: Enum for document processing states
- **AnalysisResult**: Compliance analysis results
- **ComplianceIssue**: Individual compliance issues
- **IssueSeverity**: Enum for issue severity levels
- **ApiResponse**: Generic API response wrapper
- **PaginatedResponse**: Paginated API response wrapper

## Best Practices

1. Always build the shared types package before starting services
2. Use the package name import instead of relative paths
3. Keep types consistent across all services
4. Add new types here when they need to be shared
5. Update this README when adding new types
6. Set up proper environment variables for each service 