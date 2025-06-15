const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const dbFilePath = './db.json';

// Utility: Read DB
const readDB = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

// Utility: Write DB
const writeDB = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// POST /dishes - Add new dish
app.post('/dishes', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const db = readDB();
  const newDish = {
    id: db.dishes.length ? db.dishes[db.dishes.length - 1].id + 1 : 1,
    name,
    price,
    category,
  };
  db.dishes.push(newDish);
  writeDB(db);

  res.status(201).json(newDish);
});

// GET /dishes - Retrieve all dishes
app.get('/dishes', (req, res) => {
  const db = readDB();
  res.status(200).json(db.dishes);
});

// GET /dishes/:id - Get dish by ID
app.get('/dishes/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const dish = db.dishes.find((d) => d.id === id);
  if (!dish) return res.status(404).json({ message: 'Dish not found' });

  res.status(200).json(dish);
});

// PUT /dishes/:id - Update dish
app.put('/dishes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, price, category } = req.body;

  const db = readDB();
  const index = db.dishes.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ message: 'Dish not found' });

  db.dishes[index] = { ...db.dishes[index], name, price, category };
  writeDB(db);

  res.status(200).json(db.dishes[index]);
});

// DELETE /dishes/:id - Delete dish
app.delete('/dishes/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const index = db.dishes.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ message: 'Dish not found' });

  const deleted = db.dishes.splice(index, 1);
  writeDB(db);

  res.status(200).json({ message: 'Dish deleted', dish: deleted[0] });
});

// GET /dishes/get?name=xyz - Search by name (partial match)
app.get('/dishes/get', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'Dish name is required' });

  const db = readDB();
  const result = db.dishes.filter((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );

  if (result.length === 0) {
    return res.status(404).json({ message: 'No dishes found' });
  }

  res.status(200).json(result);
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🍽️  Server running at http://localhost:${PORT}`);
});
