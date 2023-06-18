const Post= require('../models/post');
const Connection = require('../models/connections')

exports.compose = async function(req,res) {
    const post = new Post ({
        title: req.body.postTitle,
        content: req.body.postBody,
        readTime: +req.body.readTime,
        isPublic: req.body.isPublic === 'true' ? true : false,
        createTime: new Date(),
        lastUpdated: new Date(),
        userId: req.session.userId,
        isDeleted: false
    });
    await post.save();
    res.redirect("/home");
};

exports.getAllPosts = async function(req,res){
    const connections = await Connection.find({ follower: req.session.userId, isDeleted: false});
    const connectionUserId = connections.map(con => con.following._id.toString());
    const posts = await Post.find({
        $or: [{
            $expr: { $eq: ["$isPublic", true] }
         },
         {
            $and: [
                { $expr: { $eq: ["$isPublic", false] } },
                { userId: { $in: connectionUserId } }
              ]
        }]
    }).populate('userId');
    res.render('home', {posts: posts});
};

exports.getPostById= async function(req,res){
    const postId = req.params.postId;
    const post = await Post.findOne({ _id : postId }).populate('userId');
    console.log(post);
    res.render('post', {post: post});
};
