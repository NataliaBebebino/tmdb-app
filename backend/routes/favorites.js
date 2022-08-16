const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorites.controller");

router.post("/new", favoriteController.addFavoriteToUser);

module.exports = router;
