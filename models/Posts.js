const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El usuario es obligatorio"]
  },
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
    minlength: [3, "El título debe tener al menos 3 caracteres"],
    maxlength: [100, "El título no puede tener más de 100 caracteres"]
  },
  content: {
    type: String,
    required: [true, "El contenido es obligatorio"],
    minlength: [10, "El contenido debe tener al menos 10 caracteres"]
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
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Posts", postSchema);
