const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postController = require("../controllers/usersController");

router.post("/", auth, userController.create); // 🔐 autenticado

module.exports = router;