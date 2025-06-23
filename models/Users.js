const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:   { type: String }, // imagen opcional
  tokens:   [],
  confirmed: { type: Boolean, default: false }, // email confirmado
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // seguir usuarios
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
