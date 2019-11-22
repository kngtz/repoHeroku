const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();
const session = require("express-session");

const mongoURI = process.env.MONGODB_URI;
let PORT = process.env.PORT;

const goodsController = require("./controllers/goods.js");
const userController = require("./controllers/user.js");
const postController = require("./controllers/posts.js");
const sessionsController = require("./controllers/sessions.js");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use("/goods", goodsController);
app.use("/users", userController);
app.use("/posts", postController);
app.use("/sessions", sessionsController);

app.get("/", (req, res) => {
  res.redirect("/posts");
});
app.get("/users", (req, res) => {
  res.redirect("/users");
});
app.get("/posts", (req, res) => {
  res.redirect("/posts");
});
app.get("/app", (req, res) => {
  if (req.session.currentUser) {
    res.render("app/index.ejs", {
      currentUser: req.session.currentUser
    });
  } else {
    res.redirect("/sessions/new");
  }
});

if (PORT == null || PORT == "") {
  PORT = 8000;
}
app.listen(PORT);

mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
console.log(PORT);
