const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const verify = require('./controllers/authentication');
const post = require('./controllers/post');
const user = require('./controllers/user');
const connection = require('./controllers/connection');
const session = require('express-session');
const auth = require('./middleware/auth');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: 'alpha',
  resave: false,
  saveUninitialized: true
}));

mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://bat:p1p1@cluster0.urm9th1.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true})
.then(result=>{console.log("connected")});

app.get("/", auth, function(req,res){
  res.redirect("/home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login", verify.login);

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",verify.register);

app.get("/home", auth, post.getAllPosts);

app.get("/compose", auth, function(req,res){
  res.render("compose");
});

app.post("/compose", auth, post.compose)

app.get("/posts/:postId", auth, post.getPostById);

app.get('/profile', auth, user.profile);

app.get('/userList', auth, user.getAllUsers);

app.get("/follow/:userId", auth, connection.follow);

app.get('/unfollow/:userId', auth, connection.unfollow);

app.get('/logout', verify.logout);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

module.exports = app
