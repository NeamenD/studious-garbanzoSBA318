const express = require("express");
const bodyParser = require("body-parser");
const articleRouter = require("./routes/articles");

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy data for testing
let articles = [
  {
    id: 1,
    title: "Test Article",
    createdAt: new Date(),
    description: "Test description",
  },
  {
    id: 2,
    title: "Test Article 2",
    createdAt: new Date(),
    description: "Test description",
  },
];

app.get("/", (req, res) => {
  res.render("articles/index", { articles: articles });
});

// Set the view engine
app.set("view engine", "ejs");

// Use article router
app.use("/articles", articleRouter);

// GET all articles
app.get("/api/articles", (req, res) => {
  res.json(articles);
});

// GET single article by ID
app.get("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find((article) => article.id === id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json(article);
});

// POST a new article
app.post("/api/articles", (req, res) => {
  const { title, description } = req.body;
  const id = articles.length + 1;
  const newArticle = { id, title, description };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// PUT (update) an existing article
app.put("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const article = articles.find((article) => article.id === id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  article.title = title;
  article.description = description;
  res.json(article);
});

// DELETE an article
app.delete("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Article not found" });
  }
  articles.splice(index, 1);
  res.json({ message: "Article deleted successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
