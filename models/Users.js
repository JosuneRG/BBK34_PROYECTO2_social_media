const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: true,
    minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "El formato del email no es válido"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
  },
  avatar: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, "El avatar debe ser una URL de imagen válida"],
    default: "" // o puedes eliminar esta línea si quieres que sea simplemente opcional
  },
  tokens: {
    type: [String],
    default: []
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
