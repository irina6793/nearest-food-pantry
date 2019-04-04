const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users/signup", userController.signUp);
router.post("/users/signup", userController.create);

module.exports = router;
