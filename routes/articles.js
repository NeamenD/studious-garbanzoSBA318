const express = require("express");

const router = express.Router();

// Display form to create a new article
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// Handle form submission to create a new article
router.post("/", (req, res) => {
  // Here you can access the form data from req.body
  const title = req.body.title;
  const content = req.body.content;

  // Example: Save the article to the database or perform other actions
  // For now, let's just send a response
  res.send("Article created successfully!");
});

module.exports = router;
