#!/bin/bash
# ============================================
# Galaxy IT — Import n8n Workflows
# Run after setup.sh and DNS is working
# Usage: bash import-workflows.sh
# ============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
GOLD='\033[0;33m'
NC='\033[0m'

N8N_DIR="/opt/galaxy-n8n"
source "$N8N_DIR/.env" 2>/dev/null || true

N8N_URL="http://localhost:5678"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKFLOW_DIR="$(dirname "$SCRIPT_DIR")"

echo ""
echo -e "${GOLD}Importing Galaxy Assist workflows...${NC}"
echo ""

# Check n8n is running
if ! curl -s -o /dev/null -w "%{http_code}" "$N8N_URL/healthz" | grep -q "200"; then
  echo -e "${RED}n8n is not running. Start it first: cd $N8N_DIR && docker compose up -d${NC}"
  exit 1
fi

# Import each workflow
for f in "$WORKFLOW_DIR"/0*.json; do
  FILENAME=$(basename "$f")
  WORKFLOW_NAME=$(python3 -c "import json; print(json.load(open('$f'))['name'])" 2>/dev/null || echo "$FILENAME")

  echo -n "  Importing $WORKFLOW_NAME..."

  RESPONSE=$(curl -s -X POST "$N8N_URL/api/v1/workflows" \
    -u "${N8N_USER:-admin}:${N8N_PASSWORD}" \
    -H "Content-Type: application/json" \
    -d @"$f" 2>&1)

  if echo "$RESPONSE" | grep -q '"id"'; then
    WF_ID=$(echo "$RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])" 2>/dev/null || echo "?")
    echo -e " ${GREEN}OK (ID: $WF_ID)${NC}"
  else
    echo -e " ${GOLD}Already exists or error — import manually via UI${NC}"
  fi
done

echo ""
echo -e "${GREEN}Done! Open https://${N8N_HOST:-n8n.galaxyinfo.us} to review and activate workflows.${NC}"
echo ""
echo -e "${GOLD}IMPORTANT: Workflows are imported INACTIVE. Activate them in the n8n UI:${NC}"
echo -e "  1. Open each workflow"
echo -e "  2. Configure credentials (Google Sheets, SMTP, Twilio)"
echo -e "  3. Enable any disabled nodes you want to use"
echo -e "  4. Toggle the workflow to ACTIVE${NC}"
echo ""
