const Comments = require('../models/Comments')
const commentsController = {
    // 1 - Endpoint para crear un comentario en un determinado post
    async commentPost(req, res) {
        try {
            const { text } = req.body;
            const postId = req.params.postId;

            if (!text) {
                return res.status(400).json({ message: 'Texto requerido' });
            }

            if (!postId) {
                return res.status(400).json({ message: 'PostId es requerido' });
            }

            const comment = await Comments.create({
                text,
                user: req.user._id,
                post: postId
            });

            // Opcional: agregar el comentario al array de comentarios del post
            await Posts.findByIdAndUpdate(
                postId,
                { $push: { comments: comment._id } },
                { new: true }
            );

            res.status(201).json({ message: 'Comentario creado', comment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear el comentario' });
        }
    }
};

module.exports = commentsController;