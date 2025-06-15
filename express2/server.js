const express = require('express');
const app = express();

// Dummy User Data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
];

// Route: GET /users/get → single user
app.get('/users/get', (req, res) => {
  res.status(200).json(users[0]);
});

// Route: GET /users/list → all users
app.get('/users/list', (req, res) => {
  res.status(200).json(users);
});

// 404 Handler (Undefined Routes)
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
