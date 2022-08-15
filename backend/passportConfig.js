const User = require("./models/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },(email, password, done) => {
        User.findOne({ where: { email: email } })
          .then((res) => {
            if (!res) {
              done(null, false, {message: "User was not found"});
              return;
            }
            let user = res.dataValues;
            bcrypt.compare(password, user.password).then((isValid) => {
              if (isValid) done(null, user);
              else done(null, false, {message: "Incorrect password"});
            });
          })
          .catch((err) => {
            done(err);
          });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    User.findByPk(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
