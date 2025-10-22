#!/bin/bash
set -e

APP_VERSION="1.0.0"
DOCKER_IMAGE="seng-nest-api"
CONFIG=${1:-production}

echo "--------------------------------"
echo " Building Dilagro API ($CONFIG)..."
echo "--------------------------------"

# Build the Nx project
npx nx build dilagro-api --configuration=$CONFIG

echo "Packaging build..."
# Package the built app from dist
tar -cJf docker/dilagro-api/build.tar.xz -C dist/apps/dilagro-api .

echo "Building Docker image..."
docker build -f docker/dilagro-api/Dockerfile -t $DOCKER_IMAGE:$APP_VERSION .

echo "Docker image built successfully: $DOCKER_IMAGE:$APP_VERSION"
