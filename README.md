# Python AI Chat Application

A modern chat application with a React frontend and Flask backend, powered by Ollama (Llama 3.2).

## 🚀 [Live Demo](https://nichk2.github.io/geography_ai/)

> **Note:** The live demo runs with mock responses to showcase the UI/UX. For the full AI-powered experience, run the application locally.

## Repository Structure

This repository contains two main branches:
- **`main`**: Production version with full Flask backend and Ollama integration
- **`demo`**: Static demo version with mock responses for GitHub Pages

## Demo vs Production

### 🌐 Demo Version (GitHub Pages)
- Static React app with mock AI responses
- No backend required
- Perfect for showcasing UI/UX and functionality
- Deployed automatically via GitHub Actions

### 🚀 Production Version (Local)
- Full-stack application with Flask backend
- Real AI integration via Ollama (Llama 3.2)
- Requires local setup with Python and Node.js
- Complete development environment

## Features

- 🤖 AI-powered chat using Ollama with Llama 3.2 model
- 🎨 Modern React frontend with Tailwind CSS and Framer Motion
- 🔧 Flask backend with CORS support
- 📱 Responsive design with collapsible sidebar
- ⚡ Real-time chat interface with loading states
- 🚀 Easy development and production setup

## Prerequisites

- Python 3.8+
- Node.js 16+
- Ollama installed and running with Llama 3.2 model

## Quick Start

### Development Mode

1. **Setup and install dependencies:**
   ```bash
   ./start-dev.sh
   ```

2. **Start the backend (in one terminal):**
   ```bash
   ./start-backend.sh
   ```

3. **Start the frontend (in another terminal):**
   ```bash
   ./start-frontend.sh
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Production Mode

1. **Build for production:**
   ```bash
   ./build-prod.sh
   ```

2. **Start the production server:**
   ```bash
   cd backend && python main.py
   ```

3. **Access the application:**
   - Full app: http://localhost:5000

## Manual Setup

If you prefer manual setup:

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
python_ai/
├── backend/
│   ├── main.py              # Flask server with API endpoints
│   ├── requirements.txt     # Python dependencies
│   └── test.py             # Backend tests
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main React component
│   │   ├── components/
│   │   │   └── Menu.tsx    # Sidebar menu component
│   │   └── main.tsx        # React entry point
│   ├── package.json        # Node.js dependencies
│   └── vite.config.ts      # Vite configuration with proxy
├── start-dev.sh            # Development setup script
├── start-backend.sh        # Backend startup script
├── start-frontend.sh       # Frontend startup script
├── build-prod.sh          # Production build script
└── README.md              # This file
```

## API Endpoints

- `POST /api/chat` - Send a message to the AI assistant
  - Request body: `{ "message": "your message here" }`
  - Response: `{ "response": "AI response", "model": "llama3.2" }`

## Configuration

### Backend Configuration
- Ollama API URL: `http://localhost:11434/v1` (default)
- Model: `llama3.2`
- Port: `5000`

### Frontend Configuration
- Development server port: `5173`
- API proxy to backend: `/api/*` → `http://localhost:5000`

## Troubleshooting

### Common Issues

1. **Ollama not running:**
   ```bash
   # Install and start Ollama
   ollama serve
   ollama pull llama3.2
   ```

2. **CORS errors:**
   - Ensure the backend is running on port 5000
   - Check that CORS is enabled in the Flask app

3. **Frontend build issues:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## Development Notes

- The frontend uses Vite with a proxy configuration to communicate with the backend during development
- In production, the Flask server serves the built frontend static files
- The chat interface includes loading states and error handling
- Messages are stored in React state (not persisted between sessions)

## License

MIT License
