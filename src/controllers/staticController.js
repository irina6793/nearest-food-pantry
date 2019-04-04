module.exports = {
  index(req, res, next) {
    res.render("static/index", { title: "Welcome" });
  },
  user(req, res, next) {
    res.render("static/user", { name: "Nearest Food Pantry" });
  }
};
