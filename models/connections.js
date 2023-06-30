const mongoose = require("mongoose");
const schema = mongoose.Schema;

const connectionSchema = {
    follower: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    following: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: Boolean
};

module.exports =  mongoose.model("connection", connectionSchema);
