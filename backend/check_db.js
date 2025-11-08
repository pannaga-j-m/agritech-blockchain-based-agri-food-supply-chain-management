const sqlite3 = require('sqlite3').verbose();

// Open the database
const db = new sqlite3.Database('./agroledger.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the database.');
});

// Query all users
db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
        console.error('Error querying database:', err.message);
        return;
    }
    console.log('Users in database:');
    rows.forEach((row) => {
        console.log(row);
    });
});

// Close the database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
