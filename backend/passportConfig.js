const User = require("./models/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      done(null, {
        email: email,
        password: password,
      });
      //   User.findOne({ where: { email: email } })
      //     .then((res) => {
      //       console.log("dentro de then");
      //       if (!res) {
      //         done(null, false);
      //         return;
      //       }
      //       let user = res.dataValues;
      //       bcrypt.compare(password, user.password).then((isValid) => {
      //         if (isValid) done(null, user);
      //         else done(null, false);
      //       });
      //     })
      //     .catch((err) => {
      //       console.log("dentro de catch");
      //       done(err);
      //     });
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
