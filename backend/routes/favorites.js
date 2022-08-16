const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorites.controller");

router.post("/new", favoriteController.addFavoriteToUser);

router.post("/isFavorite", favoriteController.isFavorite);

router.post("/remove", favoriteController.removeFavorite);

module.exports = router;
