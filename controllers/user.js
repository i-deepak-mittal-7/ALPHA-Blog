const User= require('../models/user');
const Connection= require('../models/connections');

exports.profile = async function(req,res) {
    const user = await User.findOne({_id: req.session.userId});
    const following = await Connection.find({follower: req.session.userId, isDeleted: false}).populate('following');
    const followers = await Connection.find({following: req.session.userId, isDeleted: false}).populate('follower');
    const response = {
        profile: user,
        following: following,
        followers: followers,
    }
    console.log(response);
    res.render('profile', response);
};

exports.getAllUsers = async function(req,res) {
    const usersList = await User.find({ _id: { $ne: req.session.userId }}).lean();
    const connectionList = await Connection.find({follower: req.session.userId, isDeleted: false});
    const followingUsersList = connectionList.map(con => con.following._id.toString());
    usersList.map(user => {
        user.isFollowing = followingUsersList.includes(user._id.toString())
    });
    console.log(followingUsersList);
    res.render('userList', {usersList: usersList});
};



