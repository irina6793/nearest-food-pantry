const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const express = require("express");
const router = express.Router();

module.exports = {
  signUp(req, res, next) {
    res.render("user/signup", { title: "Signup" });
  },

  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      zipcode: req.body.zipcode
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        console.log(err);
        req.flash("error", err);
        res.redirect("/user/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");

          res.redirect("/");
        });
      }
    });
  }
};
