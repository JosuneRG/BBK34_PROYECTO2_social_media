const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postController = require("../controllers/postsController");

// 1 - Crear un post (requiere autenticación)
router.post("/", auth, postController.create);

// 2 - Actualizar un post (requiere autenticación)
router.put("/:id", auth, postController.update);

// 3 - Eliminar un post (requiere autenticación)
router.delete("/:id", auth, postController.delete);

// 4 - Obtener todos los posts con usuarios y comentarios (público)
router.get("/", postController.getAll);

// 5 - Buscar posts por nombre (público)
router.get("/search/:name", postController.getPostsByName);

// 6 - Buscar post por ID (público)
router.get("/id/:id", postController.getById);

// 8 - Obtener posts paginados (público)
router.get("/paginated", postController.getPaginated);

// 10.A - Dar like a un post (requiere autenticación)
router.post("/:id/like", auth, postController.like);

// 10.B - Quitar like de un post (requiere autenticación)
router.post("/:id/unlike", auth, postController.unlike);

module.exports = router;