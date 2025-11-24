#!/bin/bash

# Noēma Quick Start Script
# This script helps you get started with Noēma quickly

echo "╔═══════════════════════════════════════╗"
echo "║     🧠 Noēma Quick Start Setup 🧠    ║"
echo "╔═══════════════════════════════════════╗"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
echo "This may take a few minutes..."
echo ""

echo "📦 Installing backend dependencies..."
cd backend && npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
echo ""

echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi
echo ""

# Setup environment file
cd ../backend
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: You need to add your OpenAI API key${NC}"
    echo "1. Get your API key from: https://platform.openai.com/api-keys"
    echo "2. Open backend/.env file"
    echo "3. Replace 'your_openai_api_key_here' with your actual key"
    echo ""
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Done
cd ..
echo ""
echo "╔═══════════════════════════════════════╗"
echo "║          🎉 Setup Complete! 🎉        ║"
echo "╔═══════════════════════════════════════╗"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure your OpenAI API key in backend/.env"
echo ""
echo "2. Start the backend server:"
echo "   cd backend && npm start"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For more details, see README.md and SETUP_GUIDE.md"
echo ""
echo "Happy brainstorming! ✨"
