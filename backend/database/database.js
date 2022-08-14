const Sequelize = require("sequelize");

const sequelize = new Sequelize("tmdbproject", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
