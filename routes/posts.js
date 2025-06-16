const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postController = require("../controllers/postsController");

router.post("/", auth, postController.create); // 🔐 autenticado

module.exports = router;