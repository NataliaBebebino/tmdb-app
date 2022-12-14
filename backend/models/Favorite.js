const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Favorite = sequelize.define(
  "favorites",
  {
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("movie", "tv"),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ["mediaId", "type", "userId"] }] }
);

module.exports = Favorite;
