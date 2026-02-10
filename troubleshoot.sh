#!/bin/bash

echo "🔍 LaunchAlone Troubleshooting & Diagnostic Script"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

cd "$(dirname "$0")"

echo ""
echo "${BLUE}1. Checking Node.js and npm...${NC}"
if command -v node &> /dev/null; then
    echo "${GREEN}✓ Node.js: $(node -v)${NC}"
else
    echo "${RED}✗ Node.js not found${NC}"
fi

if command -v npm &> /dev/null; then
    echo "${GREEN}✓ npm: $(npm -v)${NC}"
else
    echo "${RED}✗ npm not found${NC}"
fi

echo ""
echo "${BLUE}2. Checking required files...${NC}"
files=(
    "package.json"
    "next.config.js"
    "tsconfig.json"
    "tailwind.config.js"
    "app/layout.tsx"
    "app/page.tsx"
    "lib/supabase.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "${GREEN}✓ $file${NC}"
    else
        echo "${RED}✗ $file (missing)${NC}"
    fi
done

echo ""
echo "${BLUE}3. Checking environment variables...${NC}"
if [ -f .env.local ]; then
    echo "${GREEN}✓ .env.local exists${NC}"
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL=your-project-url" .env.local 2>/dev/null; then
        echo "${YELLOW}⚠️  .env.local needs to be configured (still has placeholder values)${NC}"
    else
        echo "${GREEN}✓ .env.local appears to be configured${NC}"
    fi
else
    echo "${RED}✗ .env.local not found${NC}"
    echo "  Run: cp .env.local.example .env.local"
fi

echo ""
echo "${BLUE}4. Checking node_modules...${NC}"
if [ -d "node_modules" ]; then
    echo "${GREEN}✓ node_modules exists${NC}"
else
    echo "${YELLOW}⚠️  node_modules not found${NC}"
    echo "  Run: npm install"
fi

echo ""
echo "${BLUE}5. Checking for common issues...${NC}"

# Check for port 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "${YELLOW}⚠️  Port 3000 is already in use${NC}"
    echo "  Solution: Kill the process or use a different port"
    echo "  Kill: lsof -ti:3000 | xargs kill -9"
    echo "  Different port: npm run dev -- -p 3001"
else
    echo "${GREEN}✓ Port 3000 is available${NC}"
fi

# Check Railway CLI
echo ""
echo "${BLUE}6. Checking Railway CLI...${NC}"
if command -v railway &> /dev/null; then
    echo "${GREEN}✓ Railway CLI installed${NC}"
    
    # Try to get Railway status
    if railway status &> /dev/null; then
        echo "${GREEN}✓ Railway project linked${NC}"
    else
        echo "${YELLOW}⚠️  Railway project not linked${NC}"
        echo "  Run: railway link"
    fi
else
    echo "${YELLOW}⚠️  Railway CLI not installed${NC}"
    echo "  Install: npm install -g @railway/cli"
fi

echo ""
echo "${BLUE}7. Quick Actions:${NC}"
echo ""
echo "To start development:"
echo "  ${GREEN}npm run dev${NC}"
echo ""
echo "To test build locally:"
echo "  ${GREEN}npm run build && npm start${NC}"
echo ""
echo "To deploy to Railway:"
echo "  ${GREEN}railway up${NC}"
echo ""
echo "To check Railway logs:"
echo "  ${GREEN}railway logs${NC}"
echo ""
echo "To set Railway environment variables:"
echo "  ${GREEN}railway variables set KEY=VALUE${NC}"
echo ""

# Summary
echo ""
echo "=================================================="
echo "${BLUE}Diagnostic Summary:${NC}"

issues=0

if ! command -v node &> /dev/null; then
    echo "${RED}✗ Install Node.js${NC}"
    ((issues++))
fi

if [ ! -d "node_modules" ]; then
    echo "${YELLOW}⚠️  Run: npm install${NC}"
    ((issues++))
fi

if [ ! -f .env.local ]; then
    echo "${YELLOW}⚠️  Create .env.local from template${NC}"
    ((issues++))
elif grep -q "your-project-url" .env.local 2>/dev/null; then
    echo "${YELLOW}⚠️  Configure .env.local with real credentials${NC}"
    ((issues++))
fi

if [ $issues -eq 0 ]; then
    echo "${GREEN}✓ Everything looks good! You're ready to run 'npm run dev'${NC}"
else
    echo "${YELLOW}Please fix the issues above before running.${NC}"
fi

echo ""
