#!/bin/bash
# Creatly — VDS setup script
# Run on your VDS (213.155.10.117) as root

set -e

echo "=== 1. Install Nginx + Certbot ==="
apt update
apt install -y nginx certbot python3-certbot-nginx

echo "=== 2. Create directories ==="
mkdir -p /var/www/creatly
mkdir -p /var/www/certbot

echo "=== 3. Copy Nginx config ==="
# Copy creatly.conf to the server first, then:
cp /root/creatly.conf /etc/nginx/sites-available/creatly.conf
ln -sf /etc/nginx/sites-available/creatly.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

echo "=== 4. Test Nginx config (without SSL first) ==="
# Temporarily comment out ssl lines, get certificate, then uncomment
cat > /etc/nginx/sites-available/creatly-temp.conf << 'EOF'
server {
    listen 80;
    server_name creatly.ru www.creatly.ru *.creatly.ru;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        root /var/www/creatly;
        try_files $uri $uri/ =404;
    }
}
EOF
ln -sf /etc/nginx/sites-available/creatly-temp.conf /etc/nginx/sites-enabled/creatly.conf
nginx -t && systemctl reload nginx

echo "=== 5. Get SSL certificate ==="
certbot certonly --webroot -w /var/www/certbot \
  -d creatly.ru -d "*.creatly.ru" \
  --preferred-challenges dns \
  --email your-email@example.com \
  --agree-tos --no-eff-email

echo "=== 6. Enable full config with SSL ==="
cp /root/creatly.conf /etc/nginx/sites-available/creatly.conf
ln -sf /etc/nginx/sites-available/creatly.conf /etc/nginx/sites-enabled/creatly.conf
nginx -t && systemctl reload nginx

echo "=== 7. Setup auto-renewal ==="
echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'" | crontab -

echo "=== Done! ==="
echo "creatly.ru -> Next.js app (port 3000)"
echo "*.creatly.ru -> /var/www/creatly/{subdomain}/"
