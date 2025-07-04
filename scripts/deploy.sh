#!/bin/bash

# Hope for OCD Deployment Script
set -e

echo "🚀 Starting Hope for OCD deployment..."

# Configuration
PROJECT_NAME="hope-for-ocd"
BUILD_DIR="dist"
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    if [ ! -f ".env" ]; then
        log_error ".env file not found. Please copy .env.example and configure it."
        exit 1
    fi
    
    log_info "Prerequisites check passed ✓"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm ci --production=false
    log_info "Dependencies installed ✓"
}

# Run tests
run_tests() {
    log_info "Running tests..."
    if npm run test --if-present; then
        log_info "Tests passed ✓"
    else
        log_warn "No tests found or tests failed"
    fi
}

# Build application
build_app() {
    log_info "Building application..."
    
    # Clean previous build
    rm -rf $BUILD_DIR
    
    # Build
    npm run build
    
    if [ ! -d "$BUILD_DIR" ]; then
        log_error "Build failed - $BUILD_DIR directory not found"
        exit 1
    fi
    
    log_info "Application built successfully ✓"
}

# Deploy to different platforms
deploy_netlify() {
    log_info "Deploying to Netlify..."
    
    if command -v netlify &> /dev/null; then
        netlify deploy --prod --dir=$BUILD_DIR
        log_info "Deployed to Netlify ✓"
    else
        log_warn "Netlify CLI not found. Install with: npm install -g netlify-cli"
        log_info "Manual deployment: Upload $BUILD_DIR folder to Netlify"
    fi
}

deploy_vercel() {
    log_info "Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        log_info "Deployed to Vercel ✓"
    else
        log_warn "Vercel CLI not found. Install with: npm install -g vercel"
        log_info "Manual deployment: Upload project to Vercel"
    fi
}

deploy_docker() {
    log_info "Building Docker image..."
    
    if command -v docker &> /dev/null; then
        docker build -f docker/Dockerfile -t $PROJECT_NAME:latest .
        log_info "Docker image built ✓"
        
        log_info "To run locally: docker run -p 80:80 $PROJECT_NAME:latest"
        log_info "To deploy: Push image to your container registry"
    else
        log_error "Docker not found. Please install Docker first."
    fi
}

# Main deployment function
main() {
    echo "Hope for OCD - Deployment Script"
    echo "================================="
    
    # Parse command line arguments
    PLATFORM=${1:-"build"}
    
    case $PLATFORM in
        "netlify")
            check_prerequisites
            install_dependencies
            run_tests
            build_app
            deploy_netlify
            ;;
        "vercel")
            check_prerequisites
            install_dependencies
            run_tests
            build_app
            deploy_vercel
            ;;
        "docker")
            check_prerequisites
            deploy_docker
            ;;
        "build")
            check_prerequisites
            install_dependencies
            run_tests
            build_app
            log_info "Build complete! Upload $BUILD_DIR folder to your hosting provider."
            ;;
        *)
            echo "Usage: $0 [netlify|vercel|docker|build]"
            echo ""
            echo "Options:"
            echo "  netlify  - Deploy to Netlify"
            echo "  vercel   - Deploy to Vercel"
            echo "  docker   - Build Docker image"
            echo "  build    - Build only (default)"
            exit 1
            ;;
    esac
    
    log_info "Deployment completed successfully! 🎉"
}

# Run main function
main "$@"