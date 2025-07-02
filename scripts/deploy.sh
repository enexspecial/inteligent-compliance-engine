#!/bin/bash
set -e

echo "🚀 Starting deployment of Compliance Engine..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "📦 Building all services..."
docker-compose build

echo "🔄 Starting all services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "✅ Deployment complete!"
echo ""
echo "🌐 Services are now running:"
echo "   • Auth Service:     http://localhost:3000/api/docs"
echo "   • File Service:     http://localhost:8080/health"
echo "   • Analysis Service: http://localhost:8000/health"
echo "   • MinIO Console:    http://localhost:9001"
echo ""
echo "📊 To view logs: docker-compose logs -f"
echo "🛑 To stop services: docker-compose down" 