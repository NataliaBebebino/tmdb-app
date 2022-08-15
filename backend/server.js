const express = require("express");
const app = express();
const sequelize = require("./database/database");
const models = require("./models/Index");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/", routes);

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(5000);
    console.log("Server is listening on port", 5000);
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
}

main();
