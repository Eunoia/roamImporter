const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve install.html from the project root
app.get('/install.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'install.html'));
});

// Serve bundle.js with cache-busting mechanism
app.get('/bundle.js', (_req, res) => {
  res.sendFile(path.join(__dirname, 'bundle.js'));
});

// Serve static files from 'dist' directory
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
