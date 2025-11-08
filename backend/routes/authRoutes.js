// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database');

const router = express.Router();

// --- REGISTER ---
router.post('/register', async (req, res) => {
  const { username, password, walletAddress } = req.body;

  if (!username || !password || !walletAddress) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, password, walletAddress) VALUES (?, ?, ?)`,
      [username, hashedPassword, walletAddress],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ message: 'Username already exists.' });
          }
          return res.status(500).json({ message: 'Database error.', error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- LOGIN ---
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!user) return res.status(400).json({ message: 'Invalid username or password.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid username or password.' });

    res.status(200).json({
      username: user.username,
      walletAddress: user.walletAddress,
    });
  });
});

module.exports = router;
