const express = require("express");
const app = express();

const budget = require("./models/budget.js");

// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.post("/budgets", (req, res) => {
  budget.push(req.body);
  res.redirect("/budgets");
});

app.get("/budgets/", (request, response) => {
  response.render("index.ejs", {
    allBudgets: budget
  });
});

app.get("/budgets/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/budgets/:index", (request, response) => {
  response.render("show.ejs", {
    budgetChose: budget[request.params.index]
  });
});

app.listen(PORT, () => {
  console.log("listening...");
});
