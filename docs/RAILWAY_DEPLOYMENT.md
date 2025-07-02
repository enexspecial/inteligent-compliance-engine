# Railway Deployment Guide

This guide explains how to deploy the Intelligent Compliance Engine on Railway.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Railway CLI** (optional): `npm install -g @railway/cli`

## Deployment Options

### Option 1: Deploy Individual Services (Recommended)

Deploy each service separately for better scalability and resource management.

#### 1. Auth Service Deployment

1. **Connect Repository**:
   - Go to Railway Dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set the root directory to `services/auth-service`

2. **Add PostgreSQL Plugin**:
   - In your project, go to "Variables" tab
   - Click "New Variable" → "Reference Variable from Plugin"
   - Select "PostgreSQL" plugin
   - This will automatically add `DATABASE_URL`

3. **Add Redis Plugin**:
   - Click "New Variable" → "Reference Variable from Plugin"
   - Select "Redis" plugin
   - This will automatically add `REDIS_URL`

4. **Configure Environment Variables**:
   ```bash
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=24h
   PORT=3000
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   ```

5. **Deploy**:
   - Railway will automatically detect the NestJS app
   - It will use the `nixpacks.toml` configuration
   - The build process will:
     - Install dependencies for shared types
     - Build shared types package
     - Install auth service dependencies
     - Build the auth service

#### 2. File Service Deployment (Golang)

1. **Create New Project**:
   - Set root directory to `services/file-service`
   - Railway will auto-detect Go

2. **Configure Environment**:
   ```bash
   PORT=8080
   STORAGE_PATH=/tmp/uploads
   ```

#### 3. Analysis Service Deployment (Python)

1. **Create New Project**:
   - Set root directory to `services/analysis-service`
   - Railway will auto-detect Python

2. **Configure Environment**:
   ```bash
   PORT=8000
   OPENAI_API_KEY=your-openai-api-key
   ```

### Option 2: Monorepo Deployment

Deploy the entire monorepo as a single service (less recommended for production).

1. **Connect Repository**:
   - Set root directory to project root
   - Use the root `railway.json` configuration

2. **Add Plugins**:
   - PostgreSQL
   - Redis

3. **Configure Environment**:
   ```bash
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   PORT=3000
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   ```

## Configuration Files

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start:prod",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### nixpacks.toml (for auth service)
```toml
[phases.setup]
nixPkgs = ["nodejs", "npm"]

[phases.install]
cmds = [
  "cd ../../shared && npm install && npm run build",
  "cd ../../services/auth-service && npm install"
]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm run start:prod"
```

## Environment Variables

### Auth Service
| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ (Auto from plugin) |
| `REDIS_URL` | Redis connection string | ✅ (Auto from plugin) |
| `JWT_SECRET` | Secret for JWT tokens | ✅ |
| `JWT_EXPIRES_IN` | JWT token expiration | ❌ (default: 24h) |
| `PORT` | Server port | ❌ (default: 3000) |
| `NODE_ENV` | Environment | ❌ (default: development) |
| `ALLOWED_ORIGINS` | CORS origins | ❌ |

### File Service
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | ❌ (default: 8080) |
| `STORAGE_PATH` | File storage path | ❌ (default: /tmp) |

### Analysis Service
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | ❌ (default: 8000) |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |

## Health Checks

The auth service includes a health check endpoint at `/api/health` that Railway uses to monitor the service:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "auth-service",
  "version": "1.0.0"
}
```

## Custom Domains

1. **Add Custom Domain**:
   - Go to your Railway project
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Update CORS**:
   - Update `ALLOWED_ORIGINS` to include your custom domain

## Monitoring & Logs

- **Logs**: Available in Railway dashboard under "Deployments"
- **Metrics**: Railway provides basic metrics
- **Health Checks**: Automatic monitoring via `/api/health`

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that shared types are building correctly
   - Verify all dependencies are in `package.json`

2. **Database Connection**:
   - Ensure PostgreSQL plugin is added
   - Check `DATABASE_URL` is set correctly

3. **Redis Connection**:
   - Ensure Redis plugin is added
   - Check `REDIS_URL` is set correctly

4. **Port Issues**:
   - Railway sets `PORT` environment variable automatically
   - Don't hardcode port numbers

### Debug Commands

```bash
# Check Railway logs
railway logs

# Check service status
railway status

# View environment variables
railway variables
```

## Cost Optimization

1. **Use Individual Services**: Deploy services separately for better resource allocation
2. **Monitor Usage**: Railway provides usage metrics
3. **Scale Down**: Use smaller instances for development
4. **Auto-sleep**: Enable auto-sleep for non-critical services

## Security Best Practices

1. **Environment Variables**: Never commit secrets to code
2. **JWT Secrets**: Use strong, unique secrets
3. **CORS**: Configure `ALLOWED_ORIGINS` properly
4. **Database**: Use Railway's managed PostgreSQL
5. **HTTPS**: Railway provides automatic HTTPS

## Next Steps

After deployment:

1. **Test Endpoints**: Verify all API endpoints work
2. **Monitor Logs**: Check for any errors
3. **Set Up CI/CD**: Connect GitHub for automatic deployments
4. **Configure Alerts**: Set up monitoring alerts
5. **Backup Strategy**: Configure database backups 