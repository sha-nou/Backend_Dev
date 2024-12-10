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
    if (!title || !Author) {
      return res.status(400).send("Fields are required");
    }

    // Check if the book already exists
    const existingBook = books.find(
      (book) => book.Author === Author && book.title === title
    );

    console.log(existingBook);

    if (existingBook) {
      return res.status(409).send("Book is already in store");
    }

    // Continue with adding the book logic here
    books.push(title, Author, PublishDate);
    res.status(201).json(books);
  } catch (error) {
    console.error("Internal server error");
  }
});

// app.delete("/book/:id", (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const bookIndex = books.findIndex((book) => book.id === bookId);

//   if (bookIndex === -1) {
//     return res.status(404).json({ message: "Book not found" });
//   }

//   books.splice(bookIndex, 1);
//   res.status(204).send();
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
