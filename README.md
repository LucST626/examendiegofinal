# examendiegofinal

apt update 
apt install npm -y
npm install -g pm2

git clone mi repositorio

cd mi-repositorio

npm i

node server.js

pm2 start server.js --name test-deploy

pm2 stop test-deploy

pm2 delete test-deploy
