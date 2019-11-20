const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const goodsController = require("./controllers/goods.js");
const userController = require("./controllers/user.js");
const postController = require("./controllers/posts.js");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Routes
app.use("/goods", goodsController);
app.use("/users", userController);
app.use("/posts", postController);

app.get("/", (req, res) => {
  res.redirect("/goods");
});
app.get("/users", (req, res) => {
  res.redirect("/users");
});
app.get("/posts", (req, res) => {
  res.redirect("/posts");
});
app.listen(3000, () => {
  console.log("listening...");
});
mongoose.connect("mongodb://localhost:27017/basiccrud", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
