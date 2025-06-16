const mongose = require("mongoose");

const commentsSchema = new mongose.Schema({
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post:    { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
    image:   { type: String },
    likes:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, 
{ timestamps: true });

module.exports = mongose.model('Comments', commentsSchema);