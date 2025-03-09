// require('dotenv').config(); // Cargar variables de entorno, se puede settear desde terminal 'export NODE_ENV="dev"'
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const cors = require('cors');
const {getMessages, addMessage} = require('./database.js');

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.static('public'));

const APIKEY = "123456";

app.use(express.static('public'));

app.use(cors()); // Se puede añadir a todas las rutas

// CORS middleware
/*
const corsOptions = {
  origin: ['https://dev1.cyberbunny.online:3000', 'https://alma17.neocities.org/practica_vps'],
  optionsSuccessStatus: 200,
};
*/

// app.use(cors(corsOptions)); // Se puede añadir a todas las ruta

app.get('/', (req, res) => {
  res.send('Bienvenido al despliegue del servidor de Lucas!');
})

app.get('/messages', (req, res) => {    
   // Devolver mensajes alamacenados en la BBDD
   const apikey = req.headers['apikey'];
   if (apikey !== APIKEY){
     res.json(getMessages());
     return res.status(200).send('OK');  

    }else if (apikey === APIKEY){
      res.json(getMessages());
      return res.status(200).send('OK');  
   }
})

app.post('/messages', (req, res) => {    
   // Guardar mensajes en la BBDD
   const apikey = req.headers['apikey'];
  if (apikey !== APIKEY) {
    return res.status(401).send('Unauthorized');
  }

  // Manda el mensaje por la query y lo añadade a la BBDD
  const message = req.body.message;  
  if (message) {
    addMessage(message);
    res.status(201).send('Message added');
  } else {
    res.status(400).send('Bad Request');
  }
})

addMessage("Juan juanito juan");
console.log(process.env.NODE_ENV); // Process.env busca la variable de entorno NODE_ENV en el proyecto
if(process.env.NODE_ENV === 'production'){

  const options = {
    key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem'))
  };

  // Crear el servidor HTTPS
  https.createServer(options, app).listen(port, () => {
    console.log(`Server started on https://dev5.cyberbunny.online:${port}`);
  });
  
}else{

  // Crear el servidor HTTP
  http.createServer(app).listen(port, () => {
    console.log(`Server started on http://localhost:${port} o http://yourIP:${port}`);
  });
}