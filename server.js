const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

let port = process.env.PORT;

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
  res.redirect("/posts");
});
app.get("/users", (req, res) => {
  res.redirect("/users");
});
app.get("/posts", (req, res) => {
  res.redirect("/posts");
});

if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

mongoose.connect(
  "mongodb+srv://kngtz:kngtzz@clusterga-glxze.gcp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
console.log(port);
