const express = require('express');
const app = express();

// Home Route
app.get('/home', (req, res) => {
  res.status(200).send('<h1>Welcome to Home Page</h1>');
});

// About Us Route
app.get('/aboutus', (req, res) => {
  res.status(200).json({ message: 'Welcome to About Us' });
});

// Contact Us Route
app.get('/contactus', (req, res) => {
  res.status(200).json({
    email: 'contact@example.com',
    phone: '+91-1234567890',
    address: '123 Express Lane, Node City, JS Country'
  });
});

// 404 Route (Catch-All)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
