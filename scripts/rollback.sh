#!/bin/bash
# =============================================================
# Automated Emergency Rollback Script
# =============================================================

set -e

echo "⚠️ INITIATING EMERGENCY ROLLBACK..."

# 1. Checkout previous stable commit
echo "==> Reverting to previous Git commit..."
git checkout HEAD@{1} || git checkout HEAD~1

# 2. Rebuild and restart containers with previous stable code
echo "==> Rebuilding and restarting stable Docker containers..."
docker compose up --build -d

# 3. Verify health of rolled-back services
echo "==> Verifying rolled-back services..."
bash ./scripts/health_check.sh http://localhost

echo "✔ Rollback completed successfully! Stable state restored."
