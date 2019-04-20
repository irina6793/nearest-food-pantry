const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user/signup", userController.signUp);
router.post("/user/signup", userController.create);
router.get("/user/list", userController.list);
router.post("/user/list/create", userController.createList);

module.exports = router;
