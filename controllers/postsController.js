// Importamos el modelo de Mongoose 
const Posts = require('../models/Posts')
const PostsController = {
    
    // 1 - Endpoint para crear un post( tiene que estar autenticado)
    async create(req, res) {
        try 
        {
            const { title, content, image } = req.body;
            
            // Validamos los campos necesarios
            if (!title || !content) 
            {
                return res.status(400).send({ message: "Faltan campos obligatorios" });
            }

            //  Creamos el post y asignamos el ID del usuario autenticado
            const post = await Post.create({
                title,
                content,
                image,
                user: req.user._id  //User logueado
            });

            res.status(201).send(post);
        } 
        catch (error) {
            console.log(Error);
            res.status(500).send({
                message: "Ha habido un problema al crear el posts."
            });
        }
    },

    // 2 - Endpoint para actualizar un post ( tiene que estar autenticado)
    async update(req, res) {
        try {
        const post = await Posts.findById(req.params.id);

        if (!post) return res.status(404).send({ message: "Post no encontrado" });
        if (post.user.toString() !== req.user._id) {
            return res.status(403).send({ message: "No autorizado" });
        }

        const updatedPost = await Posts.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send(updatedPost);
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al actualizar el post" });
        }
    },
    
    // 3 - Endpoint para eliminar un post( tiene que estar autenticado)
    async delete(req, res) {
        try {
        const post = await Posts.findById(req.params.id);

        if (!post) return res.status(404).send({ message: "Post no encontrado" });

        if (post.user.toString() !== req.user._id) {
            return res.status(403).send({ message: "No autorizado" });
        }

        await Posts.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Post eliminado correctamente" });
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al eliminar el post" });
        }
    },

    // 4 - Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post
    async getAll(req, res) {
        try {
        const posts = await Posts.find()
            .populate("user", "username email")        // trae usuario creador del post
            .populate("comments.user", "username");    // trae usuarios que comentaron

        res.send(posts);
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al obtener posts" });
        }
    },

    // 5 - Endpoint para buscar post por nombre
    async getPostsByName(req, res) {
        try 
        {
            const name = new RegExp(req.params.name, 'i');
            const posts = await Posts.find({ name });
            res.send(posts);
        } 
        catch (error) {
            console.log(error);
             res.status(500).send({
                message: "Ha habido un problema al buscar un post por nombre."
            });
        }
    },

    // 6 - Endpoint para buscar post por id
    async getById(req, res) {
        try {
            const post = await Posts.findById(req.params.id)
                .populate("user", "username email")
                .populate("comments.user", "username");

            if (!post) return res.status(404).send({ message: "Post no encontrado" });

            res.send(post);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send({ message: "Error al buscar post por ID" });
        }
    },

    // 7 - Implementa validación a la hora de crear un post para que se rellene todos los campos(salvo la imagen, que no sea requerida) y si no se hace que devuelva un mensaje
    
    // 8 - Paginación de 10 en 10
     async getPaginated(req, res) {
        try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const posts = await Posts.find()
            .skip(skip)
            .limit(limit)
            .populate("user", "username");

        res.send(posts);
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al paginar los posts" });
        }
    },

    // 10 - Likes:
    // 10.A - Endpoint para dar un like a un post
    async like(req, res) {
        try {
        const post = await Posts.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.user._id } }, // evita duplicados
            { new: true }
        );
        res.send(post);
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al dar like" });
        }
    },

    // 10.B - Endpoint para quitar like a un post
    async unlike(req, res) {
        try {
        const post = await Posts.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user._id } },
            { new: true }
        );
        res.send(post);
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al quitar like" });
        }
    }
    
};


module.exports = PostsController;

