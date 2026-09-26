#!/bin/sh
set -e

echo "==> Checking database connection..."
python - <<'EOF'
import os
import socket
import time

host = os.getenv("DB_HOST", "db")
port = int(os.getenv("DB_PORT", 5432))

print(f"Waiting for database at {host}:{port}...")
start_time = time.time()
connected = False
while time.time() - start_time < 60:
    try:
        with socket.create_connection((host, port), timeout=2):
            print("Database is ready!")
            connected = True
            break
    except OSError:
        time.sleep(1)

if not connected:
    print("Database connection timed out or SQLite in use, proceeding...")
EOF

echo "==> Applying database migrations..."
python manage.py migrate --noinput

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Starting server..."
exec "$@"
