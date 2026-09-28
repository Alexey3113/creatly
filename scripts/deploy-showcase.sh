#!/bin/bash
# Стенд витрин Creatly на общем сервере, на отдельном порту — рядом с другими проектами, их не трогая:
# свой каталог, свой compose-проект со своей базой (порты БД наружу не публикуются), свой server в nginx.
# Использование: ./scripts/deploy-showcase.sh [root@host] [порт]      (повторный запуск = обновление)
set -euo pipefail

TARGET="${1:-root@150.241.115.178}"
PORT="${2:-8080}"
DIR="/opt/creatly-showcase"
HOST="${TARGET#*@}"

echo "=== Creatly showcase → $TARGET:$DIR, порт $PORT ==="

echo "→ код"
ssh "$TARGET" "mkdir -p $DIR/public/uploads/1 && chmod 755 $DIR $DIR/public $DIR/public/uploads $DIR/public/uploads/1"
rsync -az --delete \
  --exclude node_modules --exclude .next --exclude .git --exclude .claude --exclude .DS_Store \
  --exclude .agents --exclude .codex --exclude .impeccable --exclude .vscode \
  --exclude '.env' --exclude '.env.local' --exclude '/public/uploads' \
  --exclude '/analitic' --exclude '/docs' --exclude '/additional' --exclude '/upd-photos' --exclude '/undefined' \
  ./ "$TARGET:$DIR/"

echo "→ ассеты витрин (animated, hooks, story2, story — без сырых генераций и бэкапов)"
for d in animated hooks story2 story; do
  rsync -az --delete \
    --exclude '_raw/' --exclude '.bak-*' --exclude '.raw-*' --exclude '.fixed*' --exclude '.DS_Store' \
    "public/uploads/1/$d/" "$TARGET:$DIR/public/uploads/1/$d/"
done

echo "→ .env (создаётся один раз: случайные пароль БД и секрет сессий)"
ssh "$TARGET" "cd $DIR && if [ ! -f .env ]; then umask 077; printf 'DB_PASSWORD=%s\nSESSION_SECRET=%s\nSHOWCASE_APP_PORT=3100\n' \"\$(openssl rand -hex 16)\" \"\$(openssl rand -hex 32)\" > .env; fi"

echo "→ сборка и запуск контейнеров"
ssh "$TARGET" "cd $DIR && docker compose -p creatly-showcase -f docker-compose.showcase.yml up -d --build"

echo "→ nginx: server на порту $PORT"
ssh "$TARGET" "sed -e 's/listen 8080;/listen $PORT;/' -e 's/listen \[::\]:8080;/listen [::]:$PORT;/' $DIR/nginx/showcase.conf > /etc/nginx/sites-available/creatly-showcase.conf \
  && ln -sf /etc/nginx/sites-available/creatly-showcase.conf /etc/nginx/sites-enabled/creatly-showcase.conf \
  && nginx -t && systemctl reload nginx && (command -v ufw >/dev/null && ufw allow $PORT/tcp || true)"

echo "=== Готово: http://$HOST:$PORT ==="
