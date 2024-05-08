const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// Display form to create a new article
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article == null) return res.redirect("/");
  res.render("articles/show", { article: article });
});

// Handle form submission to create a new article
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("new")
);

router.put("/:id", (req, res) => {});

router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/"); // Send a 204 No Content response if deletion is successful
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).send("Error deleting article");
  }
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.id}`);
    } catch (e) {
      console.log(e);
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
