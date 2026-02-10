#!/bin/bash

echo "🚀 LaunchAlone Quick Start Script"
echo "=================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Navigate to project directory
cd "$(dirname "$0")"

echo ""
echo "${YELLOW}Step 1: Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi
echo "${GREEN}✓ Node.js $(node -v) found${NC}"

echo ""
echo "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install

echo ""
echo "${YELLOW}Step 3: Checking for environment variables...${NC}"
if [ ! -f .env.local ]; then
    echo "${YELLOW}No .env.local found. Creating from template...${NC}"
    cp .env.local.example .env.local
    echo "${RED}⚠️  IMPORTANT: Edit .env.local with your Supabase credentials!${NC}"
    echo "Get them from: https://app.supabase.com/project/YOUR_PROJECT/settings/api"
    echo ""
    read -p "Press Enter after you've updated .env.local..."
else
    echo "${GREEN}✓ .env.local exists${NC}"
fi

echo ""
echo "${YELLOW}Step 4: Installing Supabase client...${NC}"
npm install @supabase/supabase-js @supabase/ssr

echo ""
echo "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "To start development:"
echo "  ${GREEN}npm run dev${NC}"
echo ""
echo "To build for production:"
echo "  ${GREEN}npm run build${NC}"
echo ""
echo "To deploy to Railway:"
echo "  1. Install Railway CLI: ${GREEN}npm install -g @railway/cli${NC}"
echo "  2. Login: ${GREEN}railway login${NC}"
echo "  3. Link project: ${GREEN}railway link${NC}"
echo "  4. Deploy: ${GREEN}railway up${NC}"
echo ""
