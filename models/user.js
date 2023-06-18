const mongoose = require("mongoose");

const userSchema = {
    name: String,
    gender: String,
    email: String,
    password: String,
    createTime: Date
};

module.exports =  mongoose.model("User", userSchema);
