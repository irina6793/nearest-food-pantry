const userQueries = require("../db/queries.users.js");
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
  }
};
