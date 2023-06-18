const mongoose = require("mongoose");
const schema = mongoose.Schema;

const conectionSchema = {
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

module.exports =  mongoose.model("conection", conectionSchema);
