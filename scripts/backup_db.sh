#!/bin/bash
# =============================================================
# Automated PostgreSQL Backup Script for AWS / Docker
# =============================================================

set -e

BACKUP_DIR="${BACKUP_DIR:-/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/portfolio_db_backup_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "==> Starting database backup: ${BACKUP_FILE}..."
docker compose exec -T db pg_dump -U postgres portfolio_db | gzip > "${BACKUP_FILE}"

echo "==> Backup complete! Size: $(du -sh "${BACKUP_FILE}" | cut -f1)"

# Keep only the last 7 days of backups
echo "==> Pruning backups older than 7 days..."
find "${BACKUP_DIR}" -type f -name "portfolio_db_backup_*.sql.gz" -mtime +7 -delete

echo "==> Backup and retention cleanup finished successfully."
