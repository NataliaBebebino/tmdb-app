const User = require("../models/User");

const createUser = (req, res) => {
  const { userName, password, email } = req.body;

  User.create({
    userName,
    password,
    email,
  })
    .then((newUser) => {
      res.send({
        ok: true,
        user: newUser,
      });
    })
    .catch((error) => {
      res.send({
        ok: false,
        error: error.message,
      });
    });
};

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.send({ ok: false, error: err.message });
    }
    res.send({ ok: true });
  });
};

module.exports = { createUser, logout };
