// Importamos el modelo de Mongoose 
const Posts = require('../models/Posts')
const PostsController = {
    
    // 1 - Endpoint para crear un post( tiene que estar autenticado)
    async create(req, res) {
        try 
        {
            // const posts = await Posts.create(req.body);
            // res.status(201).send(posts);
            
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
    
    // 3 - Endpoint para eliminar un post( tiene que estar autenticado)
    
    // 4 - Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post
    
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
    async getById(req, res){
        try 
        {
            const posts = await Posts.find();
            res.send(products);
        } 
        catch (error) {
            console.log(error);
           res.status(500).send({
                message: "Ha habido un problema al buscar un post por id."
            }); 
        }
    }

    // 7 - Implementa validación a la hora de crear un post para que se rellene todos los campos(salvo la imagen, que no sea requerida) y si no se hace que devuelva un mensaje
    
    // 8 - Paginación de 10 en 10

    // 10 - Likes:
    // 10.A - Endpoint para dar un like a un post
    // 10.B - Endpoint para quitar like a un post

}

module.exports = PostsController;

