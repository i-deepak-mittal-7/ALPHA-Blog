const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = {
    title: String,
    content: String,
    password: String,
    createTime: Date,
    readTime: Number,
    lastUpdated: Date,
    isDeleted: Boolean,
    isPublic: Boolean,
    userId: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }
};

module.exports =  mongoose.model("Post", postSchema);
