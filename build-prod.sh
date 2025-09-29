#!/bin/bash

# Production build script
echo "🏗️  Building for production..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build

# Go back to root
cd ..

echo "✅ Production build complete!"
echo ""
echo "To start the production server:"
echo "cd backend && python main.py"
echo ""
echo "The app will be available at: http://localhost:5000"
