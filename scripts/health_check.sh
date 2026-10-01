#!/bin/bash
# =============================================================
# Post-Deployment Health Check Script
# =============================================================

set -e

HOST="${1:-http://localhost}"
MAX_RETRIES=10
RETRY_INTERVAL=3

echo "==> Starting Post-Deployment Health Checks on: ${HOST}..."

# 1. Check Frontend Availability
echo "--> Checking Frontend (HTTP 200)..."
FRONTEND_HEALTHY=false
for i in $(seq 1 $MAX_RETRIES); do
  HTTP_STATUS=$(curl -k -s -L -o /dev/null -w "%{http_code}" "${HOST}/" || true)
  if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    echo "✔ Frontend is healthy! (HTTP ${HTTP_STATUS})"
    FRONTEND_HEALTHY=true
    break
  fi
  echo "    Attempt $i/$MAX_RETRIES: Frontend not ready (HTTP ${HTTP_STATUS}). Retrying in ${RETRY_INTERVAL}s..."
  sleep $RETRY_INTERVAL
done

if [ "$FRONTEND_HEALTHY" != "true" ]; then
  echo "❌ Frontend health check failed!"
  exit 1
fi

# 2. Check Backend API Availability
echo "--> Checking Backend API (/api/visitors/)..."
API_HEALTHY=false
for i in $(seq 1 $MAX_RETRIES); do
  HTTP_STATUS=$(curl -k -s -L -o /dev/null -w "%{http_code}" "${HOST}/api/visitors/" || true)
  if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    echo "✔ Backend API is healthy! (HTTP ${HTTP_STATUS})"
    API_HEALTHY=true
    break
  fi
  echo "    Attempt $i/$MAX_RETRIES: Backend API not ready (HTTP ${HTTP_STATUS}). Retrying in ${RETRY_INTERVAL}s..."
  sleep $RETRY_INTERVAL
done

if [ "$API_HEALTHY" != "true" ]; then
  echo "❌ Backend API health check failed!"
  exit 1
fi

echo "🎉 All Post-Deployment Health Checks PASSED!"
exit 0
