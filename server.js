const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const goodsController = require("./controllers/goods.js");
const userController = require("./controllers/user.js");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Routes
app.use("/goods", goodsController);
app.use("/user", userController);

app.get("/", (req, res) => {
  res.redirect("/goods");
});
app.get("/user", (req, res) => {
  res.redirect("/user");
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
