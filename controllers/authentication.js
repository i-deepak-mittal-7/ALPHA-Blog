const User= require('../models/user');
const post = require('./post');

exports.register= async function(req,res) {
    let user = await User.findOne({email: req.body.email});
    if(!user){
        user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            createTime:new Date()
        })
        await user.save();
    }  
    res.render("login");
};

exports.login = function(req,res) {
    User.findOne({
        email:req.body.email,
        password:req.body.password
    }).then(result => {
        if(result) {
            req.session.userId = result._id.toString();
            res.redirect('/home');
        } else {
            res.render('register');
        }
    });
};

exports.logout = function(req,res) {
   req.session.destroy();
   res.redirect('/login');
};