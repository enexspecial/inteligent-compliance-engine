# Infrastructure

This directory contains deployment configurations and infrastructure-related files.

## Contents

- **Docker Compose**: Main orchestration file for local development
- **Environment Files**: Service-specific environment configurations
- **Deployment Scripts**: Automated deployment and management scripts

## Deployment Options

### Local Development
```bash
# From project root
docker-compose up -d
```

### Production Deployment
```bash
# Using the deployment script
./scripts/deploy.sh
```

## Environment Variables

Each service requires specific environment variables. Create `.env` files in each service directory:

### Auth Service
```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/compliance_engine
REDIS_URL=redis://redis:6379
JWT_SECRET=your-super-secret-jwt-key
```

### File Service
```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/compliance_engine
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

### Analysis Service
```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/compliance_engine
OPENAI_API_KEY=your-openai-api-key
```

## Monitoring

- **Health Checks**: Each service exposes a `/health` endpoint
- **Logs**: Use `docker-compose logs -f [service-name]` to view logs
- **Metrics**: Prometheus/Grafana can be added for production monitoring 