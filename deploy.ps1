# Taxi Booking System - Deployment Script (PowerShell)
# This script helps deploy the application on Windows

Write-Host "🚕 Taxi Booking System - Deployment Helper" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is installed
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check for .env file
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "📝 Please edit .env file with your configuration" -ForegroundColor Yellow
    Write-Host ""
}

# Check for frontend .env file
if (-not (Test-Path "frontend\.env")) {
    Write-Host "⚠️  frontend/.env file not found. Creating from frontend/.env.example..." -ForegroundColor Yellow
    Copy-Item "frontend\.env.example" "frontend\.env"
    Write-Host "📝 Please edit frontend/.env file with your backend URL" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Choose deployment option:"
Write-Host "1) Local deployment with Docker Compose"
Write-Host "2) Build Docker images only"
Write-Host "3) Stop all containers"
Write-Host "4) View logs"
Write-Host ""
$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "🚀 Starting deployment with Docker Compose..." -ForegroundColor Green
        docker-compose up -d --build
        Write-Host ""
        Write-Host "✅ Deployment complete!" -ForegroundColor Green
        Write-Host "Frontend: http://localhost" -ForegroundColor Cyan
        Write-Host "Backend: http://localhost:8085/api" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "View logs: docker-compose logs -f" -ForegroundColor Yellow
    }
    "2" {
        Write-Host "🔨 Building Docker images..." -ForegroundColor Green
        docker build -t taxi-backend .
        Set-Location frontend
        docker build -t taxi-frontend .
        Set-Location ..
        Write-Host "✅ Images built successfully!" -ForegroundColor Green
    }
    "3" {
        Write-Host "🛑 Stopping all containers..." -ForegroundColor Yellow
        docker-compose down
        Write-Host "✅ Containers stopped" -ForegroundColor Green
    }
    "4" {
        Write-Host "📋 Viewing logs..." -ForegroundColor Cyan
        docker-compose logs -f
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}
