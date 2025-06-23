const Comments = require('../models/Comments')
const CommentsController = {
// 1 - Endpoint para crear un comentario en un determinado post
    async commentPost (req,res)
    {
        try {
            
        } catch (error) {
            console.log();
            res.status(500).json({message: "error"});
        }
    }
}

module.exports = commentsController;