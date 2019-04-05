const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
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
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: "irina6793@yahoo.com",
            from: "test@example.com",
            subject: "Sending with SendGrid is Fun",
            text: "and easy to do anywhere, even with Node.js",
            html: "<strong>and easy to do anywhere, even with Node.js</strong>"
          };
          console.log("Sending message...");
          sgMail.send(msg);
          res.redirect("/");
        });
      }
    });
  }
};
