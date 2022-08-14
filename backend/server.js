const express = require("express");
const app = express();
const sequelize = require("./database/database");
const models = require("./models/Index");

async function main() {
  try {
    await sequelize.sync({force:false});
    app.listen(5000);
    console.log("Server is listening on port", 5000);
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
}

main();
