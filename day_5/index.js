const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const books = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/book", (req, res) => {
  try {
    const { title, Author, PublishDate } = req.body;

    // Check required fields
    if (!title || !Author || !PublishDate) {
      return res.status(400).send("Fields are required");
    }
    //check if book exists
    const bookExist = books.some(
      (book) => book.title === title && book.Author === Author
    );
    if (bookExist) res.status(409).send("Book already exists");
    const newBook = { title, Author, PublishDate };
    books.push(newBook);
    res.status(201).json(books);
  } catch (error) {
    console.error("Internal server error");
  }
});

app.delete("/book/:id", (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1)
      res.status(404).send("Ooops book is not in collection");
    books.splice(bookIndex, 1);
    res.send(books);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.put("/book/:id", (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) return res.status(404).send("Book not found");
    books[bookIndex] = updatedBook;
    res.send(books);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
