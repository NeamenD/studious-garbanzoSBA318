const http = require("http");
const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();
const port = 3000;

// prints html using view engin
app.set("view engine", "ejs");

app.use("/articles", articleRouter);

// connect the server and listen
app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test Article 2",
      createdAt: new Date(),
      description: "Test description",
    },
  ];
  res.render("articles/index", { articles: articles });
});
app.listen(port);
