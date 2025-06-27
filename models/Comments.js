const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El usuario es obligatorio"]
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "El post es obligatorio"]
  },
  content: {
    type: String,
    required: [true, "El contenido del comentario es obligatorio"],
    trim: true,
    minlength: [1, "El comentario no puede estar vacío"],
    maxlength: [500, "El comentario no puede exceder los 500 caracteres"]
  },
  image: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/, "La URL de la imagen no es válida"],
    default: ""
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentsSchema);
