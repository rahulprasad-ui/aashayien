#!/bin/bash
set -e
set -o pipefail

echo "========================================"
echo " Starting Deployment Process"
echo "========================================"

# 1. Pull latest code from rahul branch
echo "--> 1. Stashing local changes and pulling from origin/rahul..."
git stash --include-untracked || true
git fetch origin rahul
git merge origin/rahul --no-edit
git stash pop || true

# 2. Install dependencies (including dev dependencies)
echo "--> 2. Installing dependencies..."
pnpm install

# 3. Backup Database
echo "--> 3. Backing up the database..."
mkdir -p backups
BACKUP_FILE="backups/db_backup_$(date +%Y%m%d_%H%M%S).dump"

# Load environment variables from .env.production
if [ -f .env.production ]; then
  export $(grep -v '^#' .env.production | xargs)
fi

if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL not found in .env.production"
  exit 1
fi

pg_dump "$DATABASE_URL" -F c -f "$BACKUP_FILE"
echo "Database successfully backed up to $BACKUP_FILE"

# 4. Migrate DB safely (no data loss)
echo "--> 4. Migrating Database..."
# Piping 'n' ensures that if Payload detects drift and prompts for an operation
# that would cause data loss (like recreating tables), it will abort instead of wiping data.
MIGRATION_LOG="$(mktemp)"
if echo 'n' | pnpm payload migrate 2>&1 | tee "$MIGRATION_LOG"; then
  if grep -qi "data loss will occur" "$MIGRATION_LOG"; then
    echo "Migration aborted safely: Payload reported that proceeding would cause data loss."
    echo "Database backup is available at $BACKUP_FILE"
    rm -f "$MIGRATION_LOG"
    exit 1
  fi
else
  echo "Migration failed. Database backup is available at $BACKUP_FILE"
  rm -f "$MIGRATION_LOG"
  exit 1
fi
rm -f "$MIGRATION_LOG"

# 5. Build the project
echo "--> 5. Building the project..."
pnpm build

# 6. Restart PM2
echo "--> 6. Restarting PM2 server..."
pm2 restart aashayein

# 7. Verify deployment
echo "--> 7. Verifying PM2 status..."
pm2 status aashayein

echo "========================================"
echo " Deployment Successful!"
echo "========================================"
