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

const loginUser = (req, res) => {
  res.send("login successful");
};

const loginUserIncorrect = (req, res) => {
  res.send("login incorrect");
};

module.exports = { createUser, loginUser, loginUserIncorrect };
