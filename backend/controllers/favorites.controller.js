const Favorite = require("../models/Favorite");

const addFavoriteToUser = (req, res) => {
  const { mediaId, type } = req.body;

  if (!req.user) {
    return res.status(401).send("You are not logged in.");
  }

  const userId = req.user.id;

  Favorite.create({
    mediaId,
    type,
    userId,
  }).then((newFavorite) => res.send(newFavorite));
};

const removeFavorite = (req, res) => {
  const { mediaId, type } = req.body;

  if (!req.user) {
    return res.status(401).send("You are not logged in.");
  }
  const userId = req.user.id;

  Favorite.destroy({
    where: { mediaId, type, userId },
  }).then(() => res.send(true));
};

const isFavorite = (req, res) => {
  const { mediaId, type } = req.body;

  if (!req.user) {
    return res.status(401).send("You are not logged in.");
  }
  const userId = req.user.id;

  Favorite.findOne({ where: { mediaId, type, userId } }).then(
    (foundFavorite) => {
      let response = false;

      if (foundFavorite) {
        response = true;
      }
      res.send(response);
    }
  );
};

module.exports = { addFavoriteToUser, removeFavorite, isFavorite };
