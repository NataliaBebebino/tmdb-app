const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const passport = require("passport");

router.post("/new", userController.createUser);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("error: ", err);
    console.log("user: ", user);
    console.log("info: ", info);
    if (err) throw err;
    if (!user) res.send("No user exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

module.exports = router;
