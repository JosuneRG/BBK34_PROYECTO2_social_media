const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar:   { type: String }, // para multer
    confirmed: { type: Boolean, default: false }, // para email
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
} , 

{ timestamps: true });

module.exports = mongoose.model("user", userSchema);