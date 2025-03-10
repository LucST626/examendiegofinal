// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Crear tabla de posts
db.serialize(() => {
    db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT, author TEXT)");
});

// Obtener todas las entradas
function getAllPosts(callback) {
    db.all("SELECT * FROM posts", (err, rows) => {
        callback(err, rows);
    });
}

// Agregar una entrada
function addPost(title, content, author, callback) {
    const stmt = db.prepare("INSERT INTO posts (title, content, author) VALUES (?, ?, ?)");
    stmt.run(title, content, author, function (err) {
        callback(err, { id: this.lastID, title, content, author });
    });
    stmt.finalize();
}

module.exports = {
    getAllPosts,
    addPost
};