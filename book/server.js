const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const DB_PATH = "./db.json";

// Utility to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

// Utility to write to DB
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// POST /books → Add a new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "Title, author, and year are required" });
  }

  const db = readDB();
  const newBook = {
    id: db.books.length ? db.books[db.books.length - 1].id + 1 : 1,
    title,
    author,
    year
  };

  db.books.push(newBook);
  writeDB(db);

  res.status(201).json(newBook);
});

// GET /books → Get all books
app.get("/books", (req, res) => {
  const db = readDB();
  res.json(db.books);
});

// GET /books/:id → Get book by ID
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const book = db.books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// PUT /books/:id → Update book by ID
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, year } = req.body;
  const db = readDB();
  const index = db.books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  db.books[index] = { ...db.books[index], title, author, year };
  writeDB(db);

  res.json(db.books[index]);
});

// DELETE /books/:id → Delete book by ID
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const index = db.books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = db.books.splice(index, 1);
  writeDB(db);

  res.json({ message: "Book deleted", book: deleted[0] });
});

// GET /books/search?author=&title= → Search books by author or title
app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  const db = readDB();

  let filtered = db.books;

  if (author) {
    filtered = filtered.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    filtered = filtered.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.json(filtered);
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`📚 Book server running on http://localhost:${PORT}`);
});
