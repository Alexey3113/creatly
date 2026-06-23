#!/bin/bash
# Deploy Site Builder to VDS
# Usage: ./scripts/deploy.sh [user@host]
set -euo pipefail

TARGET="${1:-root@213.155.10.117}"
APP_DIR="/opt/site-builder"

echo "=== Deploying to $TARGET ==="

# 1. Sync files
echo "→ Syncing files..."
rsync -avz --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .env.local \
  --exclude .claude \
  ./ "$TARGET:$APP_DIR/"

# 2. Copy env if not exists
echo "→ Checking .env..."
ssh "$TARGET" "test -f $APP_DIR/.env || cp $APP_DIR/.env.docker.example $APP_DIR/.env"

# 3. Build and start
echo "→ Building and starting containers..."
ssh "$TARGET" "cd $APP_DIR && docker compose build && docker compose up -d"

# 4. Run migrations
echo "→ Running migrations..."
ssh "$TARGET" "cd $APP_DIR && docker compose exec app npx prisma migrate deploy"

# 5. Create sites directory
echo "→ Ensuring sites directory..."
ssh "$TARGET" "mkdir -p /var/www/sites.alexend-bot.ru"

echo "=== Deploy complete ==="
echo "App: http://$(echo $TARGET | cut -d@ -f2)"
echo "Sites: http://sites.alexend-bot.ru"
