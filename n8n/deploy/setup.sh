#!/bin/bash
# ============================================
# Galaxy IT — n8n Auto-Installer
# Run on a fresh Ubuntu 22.04+ VPS (DigitalOcean)
# Usage: bash setup.sh
# ============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
GOLD='\033[0;33m'
NC='\033[0m'

echo ""
echo -e "${GOLD}============================================${NC}"
echo -e "${GOLD}  Galaxy IT — n8n Installer${NC}"
echo -e "${GOLD}============================================${NC}"
echo ""

# ---- Check root ----
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root: sudo bash setup.sh${NC}"
  exit 1
fi

# ---- Variables ----
N8N_DIR="/opt/galaxy-n8n"
DOMAIN="n8n.galaxyinfo.us"

echo -e "${GREEN}[1/7] Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
  echo -e "${GREEN}  Docker installed.${NC}"
else
  echo -e "${GREEN}  Docker already installed.${NC}"
fi

echo -e "${GREEN}[2/7] Installing Docker Compose plugin...${NC}"
if ! docker compose version &> /dev/null; then
  apt-get update -qq
  apt-get install -y -qq docker-compose-plugin
  echo -e "${GREEN}  Docker Compose installed.${NC}"
else
  echo -e "${GREEN}  Docker Compose already installed.${NC}"
fi

echo -e "${GREEN}[3/7] Installing Caddy (reverse proxy + SSL)...${NC}"
if ! command -v caddy &> /dev/null; then
  apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq
  apt-get install -y -qq caddy
  echo -e "${GREEN}  Caddy installed.${NC}"
else
  echo -e "${GREEN}  Caddy already installed.${NC}"
fi

echo -e "${GREEN}[4/7] Creating n8n directory...${NC}"
mkdir -p "$N8N_DIR"
cd "$N8N_DIR"

# Copy files if running from the deploy directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/docker-compose.yml" ]; then
  cp "$SCRIPT_DIR/docker-compose.yml" "$N8N_DIR/"
  cp "$SCRIPT_DIR/Caddyfile" "$N8N_DIR/"
  echo -e "${GREEN}  Files copied from deploy directory.${NC}"
fi

echo -e "${GREEN}[5/7] Setting up environment...${NC}"
if [ ! -f "$N8N_DIR/.env" ]; then
  # Generate encryption key
  ENC_KEY=$(openssl rand -hex 32)

  cat > "$N8N_DIR/.env" << ENVEOF
N8N_HOST=${DOMAIN}
N8N_USER=admin
N8N_PASSWORD=$(openssl rand -base64 16)
N8N_ENCRYPTION_KEY=${ENC_KEY}
ANTHROPIC_API_KEY=sk-ant-api03-PASTE_YOUR_KEY_HERE
TEAM_EMAIL=info@galaxyinfo.us
LUIZ_EMAIL=luiz@galaxyinfo.us
LUIZ_PHONE=+15084999279
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=
ENVEOF

  echo ""
  echo -e "${GOLD}  .env created with auto-generated passwords.${NC}"
  echo -e "${GOLD}  IMPORTANT: Edit .env to add your Anthropic API key:${NC}"
  echo -e "${GOLD}    nano ${N8N_DIR}/.env${NC}"
  echo ""
else
  echo -e "${GREEN}  .env already exists — keeping current values.${NC}"
fi

echo -e "${GREEN}[6/7] Configuring Caddy (SSL + reverse proxy)...${NC}"
cat > /etc/caddy/Caddyfile << CADDYEOF
${DOMAIN} {
    reverse_proxy localhost:5678

    header {
        Access-Control-Allow-Origin https://galaxyinfo.us
        Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Access-Control-Allow-Headers "Content-Type, Authorization"
    }

    @options method OPTIONS
    handle @options {
        header Access-Control-Allow-Origin https://galaxyinfo.us
        header Access-Control-Allow-Methods "GET, POST, OPTIONS"
        header Access-Control-Allow-Headers "Content-Type, Authorization"
        respond 204
    }
}
CADDYEOF

systemctl restart caddy
echo -e "${GREEN}  Caddy configured for ${DOMAIN} with auto-SSL.${NC}"

echo -e "${GREEN}[7/7] Starting n8n...${NC}"
cd "$N8N_DIR"
docker compose down 2>/dev/null || true
docker compose up -d

# Wait for n8n to start
echo -n "  Waiting for n8n to start"
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:5678/healthz 2>/dev/null | grep -q "200"; then
    echo ""
    echo -e "${GREEN}  n8n is running!${NC}"
    break
  fi
  echo -n "."
  sleep 2
done

echo ""
echo -e "${GOLD}============================================${NC}"
echo -e "${GOLD}  INSTALLATION COMPLETE${NC}"
echo -e "${GOLD}============================================${NC}"
echo ""
echo -e "  URL:      ${GREEN}https://${DOMAIN}${NC}"
echo -e "  User:     ${GREEN}$(grep N8N_USER $N8N_DIR/.env | cut -d= -f2)${NC}"
echo -e "  Password: ${GREEN}$(grep N8N_PASSWORD $N8N_DIR/.env | cut -d= -f2)${NC}"
echo ""
echo -e "${GOLD}  NEXT STEPS:${NC}"
echo -e "  1. Point DNS: ${DOMAIN} → $(curl -s ifconfig.me || echo 'THIS_SERVER_IP')"
echo -e "  2. Edit .env with Anthropic API key: nano ${N8N_DIR}/.env"
echo -e "  3. Restart after editing: cd ${N8N_DIR} && docker compose restart"
echo -e "  4. Import workflows from n8n/ folder via the n8n UI"
echo ""
echo -e "${GOLD}  Files location: ${N8N_DIR}${NC}"
echo -e "${GOLD}  Logs: docker compose -f ${N8N_DIR}/docker-compose.yml logs -f${NC}"
echo ""
