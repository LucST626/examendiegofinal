const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { getAllPosts, addPost } = require('./database');

const app = express();
const port = 3000;

const API_KEY = '1234567890abcdef';  // API key hardcodeada

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'APIKEY']
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener las entradas del blog
app.get('/posts', (req, res) => {
    getAllPosts((err, posts) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las entradas' });
        } else {
            res.json({ posts });
        }
    });
});

// Ruta para agregar una entrada
app.post('/posts', (req, res) => {
    const { title, content, author } = req.query;
    const apiKey = req.headers['apikey'];

    // Verificar la APIKEY
    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'APIKEY no válida' });
    }

    if (!title || !content) {
        return res.status(400).json({ error: 'El título y el contenido son obligatorios' });
    }

    const postAuthor = author ? author : 'Anónimo';  // Asignar "Anónimo" si no hay autor

    addPost(title, content, postAuthor, (err, post) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar la entrada' });
        } else {
            res.status(201).json(post);  // Devolver la entrada agregada
        }
    });
});

// Configuración de HTTPS
const options = {
    cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem')),
    key: fs.readFileSync(path.join(__dirname, 'privkey.pem'))
};

// Crear servidor HTTPS
https.createServer(options, app).listen(port, () => {
    console.log(`Servidor HTTPS en https://localhost:${port}`);
});