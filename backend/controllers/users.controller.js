const User = require("../models/User");

const createUser = async (req, res) => {
  const { userName, password, email } = req.body;

  const newUser = await User.create({
    userName,
    password,
    email,
  });

  res.send(newUser);
};

const logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('ok');
  });
};


module.exports = { createUser, logout };
