const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./messages.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS messages (user TEXT, content TEXT)");
});

function getMessages() {
  return new Promise((resolve, reject) => {
    db.all("SELECT user, content FROM messages", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function addMessage({ user, content }) {
  db.run("INSERT INTO messages (user, content) VALUES (?, ?)", [user, content]);
}

module.exports = { getMessages, addMessage };
