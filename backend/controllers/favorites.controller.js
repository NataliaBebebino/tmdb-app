const Favorite = require("../models/Favorite");

const addFavoriteToUser = (req, res) => {
  const { mediaId, type } = req.body;

  if (!req.user) {
    return res.status(401).send("You are not logged in.");
  }
  
  const userId = req.user.id;

  const newFavorite = Favorite.create({
    mediaId,
    type,
    userId,
  });

  res.send(newFavorite);
};

module.exports = { addFavoriteToUser };
