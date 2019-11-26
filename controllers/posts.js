const express = require("express");
const router = express.Router();

const user = require("../models/user.js");
const post = require("../models/post.js");

router.get("/json", (req, res) => {
  post.find((err, router) => {
    res.send(router);
  });
});

router.get("/seed", (req, res) => {
  post.create(
    {
      poster: "Arthur",
      title: "First Post",
      sub: "/general",
      img: "https://i.imgur.com/FAaoe5m.jpg",
      content: "this is the content",
      comments: ["this is the first comment", "this is the second comment"],
      likes: 0
    },
    (error, data) => {
      res.redirect("/");
    }
  );
});

router.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("newPost.ejs", {
      currentUser: req.session.currentUser
    });
  } else {
    res.redirect("/sessions/new");
  }
});

router.post("/", (req, res) => {
  post.create(req.body, (error, createdPost) => {
    res.redirect("/posts");
  });
});

router.get("/", (req, res) => {
  post
    .find({})
    .populate("poster")
    .exec((error, allPosts) => {
      res.render("indexPost.ejs", {
        posts: allPosts,
        currentUser: req.session.currentUser
      });
    });
});

router.get("/:id/edit", (req, res) => {
  post.findById(req.params.id, (err, selectedPost) => {
    res.render("editPost.ejs", {
      currentUser: req.session.currentUser,
      post: selectedPost //pass in selected post
    });
  });
});

router.put("/:id", (req, res) => {
  post.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    res.redirect("/posts");
  });
});

router.delete("/:id", (req, res) => {
  post.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/posts");
  });
});

router.get("/:id", (req, res) => {
  post.findById(req.params.id, (err, selectedPost) => {
    res.render("showPost.ejs", {
      currentUser: req.session.currentUser,
      post: selectedPost
    });
  });
});

router.put("/:id/comment", (req, res) => {
  post.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    {
      $push: {
        comments: "welcome to the new comment";
      }
    }
    res.redirect("/posts/");
  });
});

module.exports = router;
