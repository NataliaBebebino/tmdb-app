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
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      // Note: Standards related to the Cookie SameSite attribute recently changed such that:
      // The cookie-sending behavior if SameSite is not specified is SameSite=Lax. Previously the default was that cookies were sent for all requests.
      // Cookies with SameSite=None must now also specify the Secure attribute (they require a secure context/HTTPS).
      // Cookies from the same domain are no longer considered to be from the same site if sent using a different scheme (http: or https:).
      sameSite: "none",
    },
  })
);

app.use(cookieParser("secretcode"));
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
