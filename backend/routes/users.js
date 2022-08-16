const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const passport = require("passport");

router.post("/new", userController.createUser);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      res.send({
        ok: false,
        error: err ? err.message : info ? info.message : "",
      });
      return;
    }
    req.logIn(user, (err) => {
      var response = {
        ok: req.user ? true : false,
        user: req.user,
        error: err ? err.message : "",
      };
      res.send(response);
    });
  })(req, res, next);
});

router.post("/logout", userController.logout);

module.exports = router;
