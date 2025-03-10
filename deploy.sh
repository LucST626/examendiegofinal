#!/bin/bash

sudo apt update

sudo apt install -y npm nodejs certbot python3-certbot-nginx

npm install

mkdir -p ./certs

sudo certbot certonly --standalone -d tudominio.com

sudo cp /etc/letsencrypt/live/tudominio.com/fullchain.pem ./certs/cert.pem
sudo cp /etc/letsencrypt/live/tudominio.com/privkey.pem ./certs/privkey.pem

sudo chmod 644 ./certs/cert.pem
sudo chmod 600 ./certs/privkey.pem

pm2 delete proyecto-final || true
pm2 start ecosystem.config.js --name proyecto-final

pm2 save