#!/bin/bash

# Taxi Booking System - Deployment Script
# This script helps deploy the application

echo "🚕 Taxi Booking System - Deployment Helper"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your configuration"
    echo ""
fi

# Check for frontend .env file
if [ ! -f frontend/.env ]; then
    echo "⚠️  frontend/.env file not found. Creating from frontend/.env.example..."
    cp frontend/.env.example frontend/.env
    echo "📝 Please edit frontend/.env file with your backend URL"
    echo ""
fi

echo "Choose deployment option:"
echo "1) Local deployment with Docker Compose"
echo "2) Build Docker images only"
echo "3) Stop all containers"
echo "4) View logs"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Starting deployment with Docker Compose..."
        docker-compose up -d --build
        echo ""
        echo "✅ Deployment complete!"
        echo "Frontend: http://localhost"
        echo "Backend: http://localhost:8085/api"
        echo ""
        echo "View logs: docker-compose logs -f"
        ;;
    2)
        echo "🔨 Building Docker images..."
        docker build -t taxi-backend .
        cd frontend && docker build -t taxi-frontend . && cd ..
        echo "✅ Images built successfully!"
        ;;
    3)
        echo "🛑 Stopping all containers..."
        docker-compose down
        echo "✅ Containers stopped"
        ;;
    4)
        echo "📋 Viewing logs..."
        docker-compose logs -f
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
