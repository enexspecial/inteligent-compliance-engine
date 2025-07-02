#!/bin/bash

# Setup script for the compliance engine development environment

set -e

echo "🚀 Setting up Intelligent Compliance Engine..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_status "Node.js version: $(node --version)"

# Setup shared types and utilities
echo "📦 Setting up shared types and utilities..."
cd shared
npm install
npm run build
cd ..

# Setup backend services
echo "🔧 Setting up backend services..."

# Auth Service
echo "  - Auth Service (NestJS)"
cd services/auth-service
npm install
npm run build
cd ../..

# File Service
echo "  - File Service (Golang)"
cd services/file-service
go mod tidy
cd ../..

# Analysis Service
echo "  - Analysis Service (Python)"
cd services/analysis-service
pip3 install -r requirements.txt
cd ../..

# Setup React web app
echo "🌐 Setting up React web app..."
cd web
npm install
cd ..

# Setup React Native mobile app
echo "📱 Setting up React Native mobile app..."
cd mobile
npm install
cd ..

echo "✅ All services and applications ready!"
echo ""
echo "🎯 Next steps:"
echo "  1. Start backend services: docker-compose up -d"
echo "  2. Start web app: cd web && npm start"
echo "  3. Start mobile app: cd mobile && npm start"
echo ""
echo "🌐 Development URLs:"
echo "  - Auth Service: http://localhost:3000/api"
echo "  - File Service: http://localhost:8080"
echo "  - Analysis Service: http://localhost:8000"
echo "  - React Web App: http://localhost:3001"
echo "  - Expo Dev Tools: http://localhost:19002"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_warning "Creating .env file from template..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/compliance_engine

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Redis Configuration (for BullMQ)
REDIS_URL=redis://localhost:6379

# Server Configuration
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
EOF
    print_status ".env file created. Please update with your actual database credentials."
else
    print_status ".env file already exists"
fi 