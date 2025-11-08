// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'agroledger.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error opening DB:', err.message);
  else console.log('Connected to the AgroLedger SQLite database.');
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      walletAddress TEXT NOT NULL
  )`,
  (err) => {
    if (err) console.error('Error creating table:', err.message);
    else console.log('Users table is ready.');
  }
);

module.exports = db;
