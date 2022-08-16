const Favorite = require("../models/Favorite");
const Axios = require("axios");

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

const getFavorites = (req, res) => {
  const userId = req.user.id;
  Favorite.findAll({ where: { userId } }).then((favoritesList) => {
    var promises = [];
    var enrichedFavoriteList = [];

    for (let i = 0; i < favoritesList.length; ++i) {
      let favoriteItem = favoritesList[i];

      let url = `https://api.themoviedb.org/3/${favoriteItem.type}/${favoriteItem.mediaId}?api_key=2e023c6fdb74b3b2d57ea6c91d6c138f`;

      let promise = Axios.get(url).then((response) => {
        let enrichedFavoriteItem = {
          title:
            favoriteItem.type === "movie"
              ? response.data.original_title
              : response.data.original_name,
          image: response.data.poster_path,
          average: response.data.vote_average,
          id: favoriteItem.mediaId,
          mediaType: favoriteItem.type,
        };
        enrichedFavoriteList.push(enrichedFavoriteItem);
      });
      promises.push(promise);
    }
    Promise.all(promises).then(() => {
      res.send(enrichedFavoriteList);
    });
  });
};

module.exports = {
  addFavoriteToUser,
  removeFavorite,
  isFavorite,
  getFavorites,
};
