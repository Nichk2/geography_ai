#!/bin/bash

# Backend startup script
echo "🚀 Starting Backend Server..."

# Activate virtual environment
source venv/bin/activate

# Start backend
cd backend
python main.py
