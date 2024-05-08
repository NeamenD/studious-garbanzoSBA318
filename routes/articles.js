const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// Display form to create a new article
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article == null) return res.redirect("/");
  res.render("articles/show", { article: article });
});

// Handle form submission to create a new article
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render("articles/new", { article: article });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/"); // Send a 204 No Content response if deletion is successful
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).send("Error deleting article");
  }
});

module.exports = router;
