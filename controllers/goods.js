const express = require("express");
const router = express.Router();
const good = require("../models/good.js");
const user = require("../models/user.js");

router.get("/json", (req, res) => {
  good.find((err, router) => {
    res.send(router);
  });
});

router.get("/seed", (req, res) => {
  good.create(
    [
      {
        name: "Hammer",
        description: "For construction",
        img: "#",
        price: 6,
        qty: 3
      },
      {
        name: "Nails",
        description: "For use in construction",
        img: "#",
        price: 1,
        qty: 20
      }
    ],
    (error, data) => {
      res.redirect("/");
    }
  );
});
router.get("/", (req, res) => {
  good.find({}, (error, allgoods) => {
    res.render("index.ejs", {
      goods: allgoods
    });
  });
});

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", (req, res) => {
  good.create(req.body, (error, createdgood) => {
    res.redirect("/");
  });
});
router.delete("/:id", (req, res) => {
  good.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/"); //redirect back to goods index
  });
});

router.get("/:id/edit", (req, res) => {
  good.findById(req.params.id, (err, foundgood) => {
    //find the good
    res.render("edit.ejs", {
      good: foundgood //pass in found good
    });
  });
});

router.get("/:id", (req, res) => {
  good.findById(req.params.id, (err, foundgood) => {
    res.render("show.ejs", {
      good: foundgood
    });
  });
});

router.put("/:id", (req, res) => {
  good.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    res.redirect("/");
  });
});

router.put("/:id/buy", (req, res) => {
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
