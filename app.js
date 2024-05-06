const express = require("express");
const Article = require("./models/article");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const dotenv = require("dotenv/config");

const app = express();

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Set the view engine
app.set("view engine", "ejs");

// Use article router
app.use(express.urlencoded({ extended: false }));

// Dummy data for testing

app.get("/", async (req, res) => {
  try {
    const articles = await Article.find(); // Set a timeout of 60 seconds (60000 milliseconds)
    res.render("articles/index", { articles: articles });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).send("Error fetching articles");
  }
});

app.use("/articles", articleRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
