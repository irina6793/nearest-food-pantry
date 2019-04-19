require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const logger = require("morgan");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport-config");
const session = require("express-session");

module.exports = {
  init(app, express) {
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
      })
    );
    app.use(flash());
    passportConfig.init(app);
    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });

    //app.all("/express-flash-notification", function(req, res) {
    //  req.flash("success");
    //  res.redirect(301, "/");
    //  });

    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(logger("dev"));
  }
};
