#!/bin/bash

echo "Conectando al servidor remoto..."

# Actualizar los paquetes del sistema
apt update

# Instalar npm, nodejs y certbot
apt install -y npm nodejs certbot

# Instalar dependencias del proyecto
npm install

# Generar certificados SSL usando certbot
certbot certonly --standalone -d dev6.cyberbunny.online --non-interactive --agree-tos -m lucasst626@gmail.com

# Verificar si los certificados fueron generados correctamente
if [ -f /etc/letsencrypt/live/dev6.cyberbunny.online/fullchain.pem ] && [ -f /etc/letsencrypt/live/dev6.cyberbunny.online/privkey.pem ]; then
  # Crear directorio de certificados si no existe
  mkdir -p ./certs

  # Copiar los certificados generados a la ubicación esperada por tu aplicación
  cp /etc/letsencrypt/live/dev6.cyberbunny.online/fullchain.pem ./certs/fullchain.pem
  cp /etc/letsencrypt/live/dev6.cyberbunny.online/privkey.pem ./certs/privkey.pem

  # Cambiar permisos de los archivos de certificados
  chmod 600 ./certs/fullchain.pem
  chmod 600 ./certs/privkey.pem

  echo "Certificados copiados y permisos establecidos."
else
  echo "Error: Certificados no generados correctamente."
  exit 1
fi

# Detener el proceso existente de PM2 si existe
pm2 stop proyecto-final || true

# Iniciar el proceso con PM2 utilizando el archivo ecosystem.config.js
pm2 start ecosystem.config.js --env production

# Guardar la lista de procesos de PM2
pm2 save

echo "Despliegue completado."