require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const useHttps = process.env.USE_HTTPS === 'true';

// Configurar CORS
app.use(cors());


app.use('/api', routes);

if (useHttps) {
  const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
  };

  https.createServer(options, app).listen(port, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${port}`);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`Servidor HTTP corriendo en http://localhost:${port}`);
  });
}