const express = require("express");
const app = express();
const sequelize = require("./database/database");
const models = require("./models/Index");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET_CODE));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/", routes);

/* Start Error handling middleware*/
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});
/* End Error handling middleware*/

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT || 5000);
    false;
    console.log("Server is listening on port", 5000);
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
}

main();
