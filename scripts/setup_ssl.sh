#!/bin/bash
# =============================================================
# Automated Let's Encrypt SSL Setup for vyzareddy.in on EC2
# =============================================================

set -e

DOMAIN="vyzareddy.in"
EMAIL="vyza.18@gmail.com"

echo "============================================================="
echo " Setting up Free SSL / HTTPS for ${DOMAIN} and www.${DOMAIN}"
echo "============================================================="

# 1. Install Certbot
echo "==> Checking and installing Certbot..."
if ! command -v certbot &> /dev/null; then
    if command -v dnf &> /dev/null; then
        sudo dnf install -y certbot
    elif command -v yum &> /dev/null; then
        sudo yum install -y certbot
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y certbot
    fi
fi


# 2. Temporarily stop container on port 80 to run standalone verification
echo "==> Stopping frontend container to issue certificate on port 80..."
docker compose stop frontend || true

# 3. Request certificate from Let's Encrypt
echo "==> Requesting certificate for ${DOMAIN} and www.${DOMAIN}..."
sudo certbot certonly --standalone \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}" \
    --agree-tos \
    --email "${EMAIL}" \
    --non-interactive

# 4. Activate the SSL Nginx configuration in frontend
echo "==> Activating Production SSL Nginx configuration..."
cp ./frontend/nginx.prod.conf ./frontend/nginx.conf

# 5. Rebuild and restart frontend with SSL
echo "==> Rebuilding and restarting containers with HTTPS..."
docker compose up --build -d

# 6. Setup auto-renewal cron
echo "==> Configuring automatic renewal cron job..."
(crontab -l 2>/dev/null | grep -v "certbot renew" ; echo "0 3 * * * certbot renew --quiet --deploy-hook 'docker compose restart frontend'") | crontab -

echo "============================================================="
echo "🎉 SSL Certificate Successfully Activated for https://${DOMAIN}!"
echo "============================================================="
