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
  res.render("newPost.ejs");
});

router.post("/", (req, res) => {
  post.create(req.body, (error, createdPost) => {
    res.redirect("/posts");
  });
});

router.get("/", (req, res) => {
  post.find({}, (error, allPosts) => {
    res.render("indexPost.ejs", {
      posts: allPosts
    });
  });
});

router.get("/:id/edit", (req, res) => {
  post.findById(req.params.id, (err, selectedPost) => {
    //find the good
    res.render("editPost.ejs", {
      post: selectedPost //pass in found good
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
    res.redirect("/posts"); //redirect back to goods index
  });
});

router.get("/:id", (req, res) => {
  post.findById(req.params.id, (err, selectedPost) => {
    res.render("showPost.ejs", {
      post: selectedPost
    });
  });
});

router.put("/:id/comment", (req, res) => {
  good.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } }, (err, good) => {
    if (err) {
      console.log(err);
    }
    user.findOneAndUpdate(
      {},
      { $push: { shopping_cart: good } },
      (err, good) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      }
    );
  });
});

module.exports = router;