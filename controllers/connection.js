const Connection= require('../models/connections');

exports.follow = async function(req,res) {
    const followingUserId = req.params.userId;
    const userId = req.session.userId;
    let connection = await Connection.findOne({follower: userId, following: followingUserId});
    if(connection) {
        connection.isDeleted = false;
    } else {
         connection = new Connection({
            follower: userId,
            following: followingUserId,
            isDeleted: false
        })
        
    }
    await connection.save();
    res.redirect("/userList");
   
};

exports.unfollow = async function(req,res) {
    const followingUserId = req.params.userId;
    const userId = req.session.userId;
    const connection = await Connection.findOne({follower: userId, following: followingUserId});
    connection.isDeleted = true;
    await connection.save();
    res.redirect("/userList");
};
