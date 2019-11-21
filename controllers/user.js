const express = require("express");
const router = express.Router();
const good = require("../models/good.js");
const user = require("../models/user.js");

router.get("/json", (req, res) => {
  user.find((err, router) => {
    res.send(router);
  });
});

router.get("/seed", (req, res) => {
  user.create(
    {
      username: "PocklePickle",
      posts: [],
      subs: []
    },
    (error, data) => {
      res.redirect("/");
    }
  );
});

router.get("/", (req, res) => {
  user.find({}, (error, allusers) => {
    res.render("indexUser.ejs", {
      users: allusers
    });
  });
});

router.get("/:id", (req, res) => {
  user.findById(req.params.id, (err, selectedUser) => {
    res.render("showUser.ejs", {
      sUser: selectedUser
    });
  });
});

module.exports = router;
